from datetime import datetime

import sqlalchemy as sa
from sqlalchemy.types import PickleType
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Task and TaskSet classes are copied from (reduced)
# https://github.com/celery/celery/blob/8ebcce1523d79039f23da748f00bec465951de2a/celery/backends/database/models.py
# To be able to run migrations for celery tables

DEFAULT_STATE = "PENDING"

class Task(Base):
  __tablename__ = 'celery_taskmeta'
  __table_args__ = {'sqlite_autoincrement': True, 'extend_existing': True}

  id = sa.Column(sa.Integer, sa.Sequence('task_id_sequence'),
                 primary_key=True, autoincrement=True)
  task_id = sa.Column(sa.String(155), unique=True)
  status = sa.Column(sa.String(50), default=DEFAULT_STATE)
  result = sa.Column(PickleType, nullable=True)
  date_done = sa.Column(sa.DateTime, default=datetime.utcnow,
                        onupdate=datetime.utcnow, nullable=True)
  traceback = sa.Column(sa.Text, nullable=True)

  name = sa.Column(sa.String(155), nullable=True)
  args = sa.Column(sa.LargeBinary, nullable=True)
  kwargs = sa.Column(sa.LargeBinary, nullable=True)
  worker = sa.Column(sa.String(155), nullable=True)
  retries = sa.Column(sa.Integer, nullable=True)
  queue = sa.Column(sa.String(155), nullable=True)

class TaskSet(Base):
  __tablename__ = 'celery_tasksetmeta'
  __table_args__ = {'sqlite_autoincrement': True}

  id = sa.Column(sa.Integer, sa.Sequence('taskset_id_sequence'),
                 autoincrement=True, primary_key=True)
  taskset_id = sa.Column(sa.String(155), unique=True)
  result = sa.Column(PickleType, nullable=True)
  date_done = sa.Column(sa.DateTime, default=datetime.utcnow, nullable=True)
