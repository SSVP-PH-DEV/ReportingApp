from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, date
import uvicorn
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
import os
import json
from uuid import uuid4, UUID

# Initialize FastAPI app
app = FastAPI(title="Parish Finance API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- Models ---

class UserBase(BaseModel):
    email: str
    name: str
    
class UserCreate(UserBase):
    password: str
    role: str = "staff"
    
class User(UserBase):
    id: str
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        orm_mode = True
        
class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    email: Optional[str] = None

class IncomeBase(BaseModel):
    date: date
    category: str
    source: str
    amount: float
    description: Optional[str] = None
    
class IncomeCreate(IncomeBase):
    pass

class Income(IncomeBase):
    id: str
    created_by: str
    created_at: datetime
    
    class Config:
        orm_mode = True
        
class ExpenseBase(BaseModel):
    date: date
    category: str
    vendor: str
    amount: float
    description: Optional[str] = None
    
class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: str
    created_by: str
    status: str = "pending"
    created_at: datetime
    
    class Config:
        orm_mode = True
        
class DonorBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None
    
class DonorCreate(DonorBase):
    pass

class Donor(DonorBase):
    id: str
    created_at: datetime
    last_donation: Optional[date] = None
    total_donations: float = 0.0
    status: str = "active"
    
    class Config:
        orm_mode = True

# --- Mock Database ---
# In a real application, this would be replaced with a database

class Database:
    def __init__(self):
        self.users = {}
        self.incomes = {}
        self.expenses = {}
        self.donors = {}
        self.categories = {
            "income": [
                "Sunday Collection", 
                "Special Collection", 
                "Donations", 
                "Building Fund", 
                "Mission Fund", 
                "Youth Ministry", 
                "Events", 
                "Other"
            ],
            "expense": [
                "Utilities", 
                "Maintenance", 
                "Staff Salaries", 
                "Office Supplies", 
                "Ministry Activities", 
                "Events", 
                "Charitable Giving", 
                "Education", 
                "Other"
            ]
        }
        
        # Create admin user
        admin_id = str(uuid4())
        self.users[admin_id] = {
            "id": admin_id,
            "email": "admin@parish.org",
            "name": "Admin User",
            "password": pwd_context.hash("admin123"),
            "role": "admin",
            "is_active": True,
            "created_at": datetime.now()
        }

db = Database()

# --- Helper Functions ---

def get_user(email: str):
    for user_id, user in db.users.items():
        if user["email"] == email:
            return user
    return None

def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user:
        return False
    if not pwd_context.verify(password, user["password"]):
        return False
    return user

# --- API Routes ---

@app.get("/")
def read_root():
    return {"message": "Welcome to Parish Finance API"}

@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # In a real app, generate JWT token here
    # For now, just return a mock token
    token = f"mock-token-{user['id']}"
    
    return {"access_token": token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(token: str = Depends(oauth2_scheme)):
    # In a real app, decode JWT token here
    # For now, just extract user ID from mock token
    try:
        user_id = token.split("-")[-1]
        user = db.users.get(user_id)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return user
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

@app.post("/users/", response_model=User)
async def create_user(user: UserCreate, token: str = Depends(oauth2_scheme)):
    # Check if user is admin
    try:
        user_id = token.split("-")[-1]
        current_user = db.users.get(user_id)
        if not current_user or current_user["role"] != "admin":
            raise HTTPException(status_code=403, detail="Not authorized to create users")
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    # Check if email already exists
    if get_user(user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    new_user_id = str(uuid4())
    new_user = {
        "id": new_user_id,
        "email": user.email,
        "name": user.name,
        "password": pwd_context.hash(user.password),
        "role": user.role,
        "is_active": True,
        "created_at": datetime.now()
    }
    db.users[new_user_id] = new_user
    
    return new_user

@app.get("/users/", response_model=List[User])
async def read_users(token: str = Depends(oauth2_scheme)):
    # Check if user is admin
    try:
        user_id = token.split("-")[-1]
        current_user = db.users.get(user_id)
        if not current_user or current_user["role"] != "admin":
            raise HTTPException(status_code=403, detail="Not authorized to view all users")
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    return list(db.users.values())

@app.get("/categories/")
async def get_categories(token: str = Depends(oauth2_scheme)):
    # Validate token
    try:
        user_id = token.split("-")[-1]
        if user_id not in db.users:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    return db.categories

@app.post("/incomes/", response_model=Income)
async def create_income(income: IncomeCreate, token: str = Depends(oauth2_scheme)):
    # Validate token
    try:
        user_id = token.split("-")[-1]
        current_user = db.users.get(user_id)
        if not current_user:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    # Create income entry
    income_id = str(uuid4())
    new_income = {
        "id": income_id,
        "date": income.date,
        "category": income.category,
        "source": income.source,
        "amount": income.amount,
        "description": income.description,
        "created_by": current_user["id"],
        "created_at": datetime.now()
    }
    db.incomes[income_id] = new_income
    
    return new_income

@app.get("/incomes/", response_model=List[Income])
async def read_incomes(token: str = Depends(oauth2_scheme)):
    # Validate token
    try:
        user_id = token.split("-")[-1]
        if user_id not in db.users:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    return list(db.incomes.values())

@app.post("/expenses/", response_model=Expense)
async def create_expense(expense: ExpenseCreate, token: str = Depends(oauth2_scheme)):
    # Validate token
    try:
        user_id = token.split("-")[-1]
        current_user = db.users.get(user_id)
        if not current_user:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    # Create expense entry
    expense_id = str(uuid4())
    new_expense = {
        "id": expense_id,
        "date": expense.date,
        "category": expense.category,
        "vendor": expense.vendor,
        "amount": expense.amount,
        "description": expense.description,
        "created_by": current_user["id"],
        "status": "pending",
        "created_at": datetime.now()
    }
    db.expenses[expense_id] = new_expense
    
    return new_expense

@app.get("/expenses/", response_model=List[Expense])
async def read_expenses(token: str = Depends(oauth2_scheme)):
    # Validate token
    try:
        user_id = token.split("-")[-1]
        if user_id not in db.users:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    return list(db.expenses.values())

@app.post("/donors/", response_model=Donor)
async def create_donor(donor: DonorCreate, token: str = Depends(oauth2_scheme)):
    # Validate token
    try:
        user_id = token.split("-")[-1]
        if user_id not in db.users:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    # Create donor
    donor_id = str(uuid4())
    new_donor = {
        "id": donor_id,
        "name": donor.name,
        "email": donor.email,
        "phone": donor.phone,
        "address": donor.address,
        "created_at": datetime.now(),
        "last_donation": None,
        "total_donations": 0.0,
        "status": "active"
    }
    db.donors[donor_id] = new_donor
    
    return new_donor

@app.get("/donors/", response_model=List[Donor])
async def read_donors(token: str = Depends(oauth2_scheme)):
    # Validate token
    try:
        user_id = token.split("-")[-1]
        if user_id not in db.users:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    return list(db.donors.values())

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)