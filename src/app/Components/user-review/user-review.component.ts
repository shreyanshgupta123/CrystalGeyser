import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { take, timer } from 'rxjs';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  UsersReview: any[] = [];
isLoading=true;
showReview=false
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.UserReview();
  }

  UserReview(): void {
    this.userService.getUserReview().subscribe(
      data => {
        timer(800).pipe(take(1)).subscribe(() => {
          this.isLoading = false;})
          this.showReview=true
        this.UsersReview = data;
      }
    );
  }

  generateStars(rating: number): boolean[] {
    const totalStars = 5;
    return Array(totalStars).fill(true).map((_, i) => i < rating);
  }
}
