import { Component } from "@angular/core"

@Component({
  selector: 'ap-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  isShow = false;

  toggle() {
    this.isShow = !this.isShow;
    console.log(this.isShow)
  }
}
