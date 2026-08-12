---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/file-uploader/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
No accessibility annotations are needed for file uploaders, but keep these
considerations in mind if you are modifying Carbon or creating a custom
component.

  What Carbon provides
  Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via the keyboard. Carbon incorporates many
other accessibility considerations, some of which are described below.

### Keyboard interactions

Both variants of the file uploader provide buttons for uploading and removing
files. The drop target “Drag and drop files here..." also provides conventional
button keyboard interaction (`Tab` to reach; `Enter` or `Space` to activate).
Once a file has been added, it can be removed by activating the delete (“x”)
button after each file name.

![example of file uploader keyboard interaction](images/file-uploader-accessibility-1.png)

  The drop zone is also a button that responds to standard keyboard interaction.

![File uploader with two files attached](images/file-uploader-accessibility-2.png)

  Uploaded files can be removed by tabbing to each “x” button and activating.

## Development considerations

Keep these considerations in mind if you are modifying Carbon or creating a
custom component:

- The 'Drag files' area is constructed as a button to support keyboard
  operation.
- Error messages about file uploads must be exposed to assistive technology.
- The Delete button needs to have the uploaded file name associated with it
  programmatically, so the user understands which file will be removed.
