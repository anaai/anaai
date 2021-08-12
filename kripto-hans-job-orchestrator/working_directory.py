import os
import tempfile
from pathlib import Path

def local_file_path(name):
  directory = tempfile.mkdtemp()
  return str(Path(directory, name))

def remove_file(file_path):
  os.remove(file_path)
