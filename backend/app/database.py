import os
import time
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("DATABASE_URL")

Base = declarative_base()

engine = create_engine(DATABASE_URL) if DATABASE_URL else None
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
) if engine else None