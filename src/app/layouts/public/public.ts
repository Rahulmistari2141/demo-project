import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { PublicHeader } from '../../features/public-header/public-header';
import { PublicFooter } from '../../features/public-footer/public-footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [CommonModule,RouterOutlet,PublicHeader,PublicFooter],
  templateUrl: './public.html',
  styleUrl: './public.scss',
})
export class Public {
  hideHeaderFooter: boolean = false;

  constructor(private router: Router) {}
  

 ngOnInit() {
    this.checkHeaderFooterVisibility(this.router.url);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkHeaderFooterVisibility(event.url);
      }
    });
  }

  checkHeaderFooterVisibility(url: string) {
    this.hideHeaderFooter = url.includes('/login') ||  url.includes('/forgot-password');
  }
  
}
