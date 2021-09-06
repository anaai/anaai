from unittest.mock import patch

import working_directory

@patch("working_directory.tempfile.mkdtemp")
def test_local_file_path(mock):
  mock.return_value = "directory"
  path = working_directory.local_file_path("image.jpg")
  assert path == "directory/image.jpg"

@patch("working_directory.os.remove")
def test_remove_file(mock):
  file_path = "path/file.jpg"

  working_directory.remove_file(file_path)
  mock.assert_called_with(file_path)
