import { Component } from '@angular/core';
import { isTauri } from '@tauri-apps/api/core';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { platform } from '@tauri-apps/plugin-os';

@Component({
  selector: 'app-title-bar',
  imports: [],
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.css'
})
export class TitleBar {
  isAWindow = !["ios", "android"].includes(platform()) && isTauri();

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
