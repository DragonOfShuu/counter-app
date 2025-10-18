import { Component } from '@angular/core';
import { getCurrentWindow } from '@tauri-apps/api/window';

@Component({
  selector: 'app-title-bar',
  imports: [],
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.css'
})
export class TitleBar {
  minimizeWindow() {
    getCurrentWindow().minimize();
  }

  maximizeWindow() {
    getCurrentWindow().toggleMaximize();
  }

  closeWindow() {
    getCurrentWindow().close();
  }
}
