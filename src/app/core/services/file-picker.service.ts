import {
  Mediafilepicker,
  ImagePickerOptions,
  VideoPickerOptions,
  AudioPickerOptions,
  FilePickerOptions,
} from 'nativescript-mediafilepicker';
import { Injectable } from '@angular/core';

@Injectable()
export class FilePickerService {
  constructor() {}

  selectFile(extension: string, onSelect, onError, onCancel) {
    let extensions = [];
    // TODO: set extensions for ios too
    extensions = [extension];

    let options: FilePickerOptions = {
      android: {
        extensions: extensions,
        maxNumberFiles: 1,
      },
      ios: {
        extensions: extensions,
        multipleSelection: true,
      },
    };

    let mediafilepicker = new Mediafilepicker();
    mediafilepicker.openFilePicker(options);

    mediafilepicker.on('getFiles', function (res) {
      let results = res.object.get('results');
      console.dir(results);
      if (onSelect) {
        onSelect(results);
      }
    });

    mediafilepicker.on('error', function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
      if (onError) {
        onError(msg);
      }
    });

    mediafilepicker.on('cancel', function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
      if (onCancel) {
        onCancel(msg);
      }
    });
  }

  selectImage(onSelect, onError, onCancel) {
    let options: ImagePickerOptions = {
      android: {
        isCaptureMood: false, // if true then camera will open directly.
        isNeedCamera: true,
        maxNumberFiles: 1,
        isNeedFolderList: true,
      },
      ios: {
        isCaptureMood: false, // if true then camera will open directly.
        isNeedCamera: true,
        maxNumberFiles: 1,
      },
    };

    let mediafilepicker = new Mediafilepicker();
    mediafilepicker.openImagePicker(options);

    mediafilepicker.on('getFiles', function (res) {
      let results = res.object.get('results');
      console.dir(results);
      if (onSelect) {
        onSelect(results);
      }
    });

    // for iOS iCloud downloading status
    mediafilepicker.on('exportStatus', function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
    });

    mediafilepicker.on('error', function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
      if (onError) {
        onError(msg);
      }
    });

    mediafilepicker.on('cancel', function (res) {
      let msg = res.object.get('msg');
      console.log(msg);
      if (onCancel) {
        onCancel(msg);
      }
    });
  }
}
