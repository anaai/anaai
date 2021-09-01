import pytest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import Base, get_session

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
  SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_session():
  try:
    session = TestingSessionLocal()
    yield session
  finally:
    session.close()

@pytest.fixture()
def test_db():
  Base.metadata.create_all(bind=engine)
  yield
  Base.metadata.drop_all(bind=engine)

