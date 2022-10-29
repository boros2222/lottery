import {Component, OnInit} from '@angular/core';
import {UserService} from "../../modules/authentication/services/user.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService,
              private library: FaIconLibrary) {

    library.addIcons(faRightFromBracket);
  }

  ngOnInit(): void {
  }

}
