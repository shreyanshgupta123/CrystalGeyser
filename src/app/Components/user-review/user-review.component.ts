import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  UsersReview: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.UserReview();
  }

  UserReview(): void {
    this.userService.getUserReview().subscribe(
      data => {
        console.log(data);
        this.UsersReview = data;
      }
    );
  }

  generateStars(rating: number): boolean[] {
    const totalStars = 5;
    return Array(totalStars).fill(true).map((_, i) => i < rating);
  }
}
