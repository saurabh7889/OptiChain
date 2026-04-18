import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration class."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'optichain_super_secret_key')
    DEBUG = os.environ.get('DEBUG', 'False').lower() in ('true', '1', 't')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'mysql+pymysql://root:password@localhost/optichain')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
