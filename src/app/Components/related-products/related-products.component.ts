import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {
  constructor(private router: Router) {}
products:any[]=[
  {
    id: 1,
    productname: "Crystal Geyser Natural Alpine Spring Water, 8 Fl Oz",
    price: 0.5,
    size: 1,
    rating: 4,
    bottles: 1,
    image: "./assets/item1.jpg",
    description: "Refresh yourself with this convenient 8 fl oz bottle of Crystal Geyser Natural Alpine Spring Water. Perfect for on-the-go hydration, whether you're at work, school, or out for a jog.",
    reviews: [
      {
        customer: "Alice",
        rating: 5,
        comment: "Love the convenient size! Perfect for throwing in my bag."
      },
      {
        customer: "Bob",
        rating: 3,
        comment: "Good water, but a bit pricey for the size."
      },
      {
        customer: "Charlie",
        rating: 4,
        comment: "Refreshing taste, but wish it came in a larger bottle."
      },
      {
        customer: "Diana",
        rating: 4,
        comment: "Decent water for the price. Satisfies my thirst."
      }
    ]
  },
  {
    id: 2,
    productname: "Crystal Geyser Natural Alpine Spring Water, 16.9 Fl Oz",
    price: 0.75,
    size: 1,
    rating: 4.1,
    bottles: 2,
    image: "./assets/item2.jpg",
    description: "Enjoy the crisp, refreshing taste of Crystal Geyser Natural Alpine Spring Water in a convenient 16.9 fl oz bottle. Keep hydrated throughout the day with this handy pack of two bottles.",
    reviews: [
      {
        customer: "Eva",
        rating: 4,
        comment: "Great value for the pack of two. Tastes clean and pure."
      },
      {
        customer: "Frank",
        rating: 5,
        comment: "My go-to water choice. Always satisfied with the quality."
      },
      {
        customer: "Gina",
        rating: 3,
        comment: "Decent water, but the bottles are a bit flimsy."
      },
      {
        customer: "Harry",
        rating: 4,
        comment: "Convenient size for carrying around. Good taste."
      }
    ]
  },
  {
    id: 3,
    productname: "Crystal Geyser Natural Alpine Spring Water, 33.8 Fl Oz",
    price: 1.25,
    size: 1,
    rating: 4.3,
    bottles: 3,
    image: "./assets/item3.jpg",
    description: "Stay hydrated with this family-sized 33.8 fl oz bottle of Crystal Geyser Natural Alpine Spring Water. With a rating of 4.3 stars, this refreshing water is perfect for sharing with loved ones.",
    reviews: [
      {
        customer: "Ivan",
        rating: 5,
        comment: "Perfect for family outings. Everyone loves it!"
      },
      {
        customer: "Julia",
        rating: 4,
        comment: "Great taste, but wish it came in a more eco-friendly packaging."
      },
      {
        customer: "Kevin",
        rating: 4,
        comment: "Good value for the size. Keeps me hydrated during workouts."
      },
      {
        customer: "Lisa",
        rating: 5,
        comment: "Excellent choice for picnics. Will buy again!"
      }
    ]
  },
  {
    id: 4,
    productname: "Crystal Geyser Natural Alpine Spring Water, 1 Gallon",
    price: 1.5,
    size: 1,
    rating: 4.5,
    bottles: 4,
    image: "./assets/item4.jpg",
    description: "Quench your thirst with this generous 1-gallon jug of Crystal Geyser Natural Alpine Spring Water. Rated 4.5 stars, this gallon-sized bottle is perfect for keeping in the fridge at home or the office.",
    reviews: [
      {
        customer: "Michael",
        rating: 5,
        comment: "Best bang for your buck. Lasts a long time!"
      },
      {
        customer: "Nancy",
        rating: 4,
        comment: "Great for parties. Guests always appreciate it."
      },
      {
        customer: "Olivia",
        rating: 5,
        comment: "Love the taste and the convenience of the gallon size."
      },
      {
        customer: "Peter",
        rating: 4,
        comment: "Saves me from constantly refilling smaller bottles. Very satisfied."
      }
    ]
  },
  {
    id: 5,
    productname: "Crystal Geyser Natural Alpine Spring Water, 1.5 Liter",
    price: 1.0,
    size: 1,
    rating: 4.4,
    bottles: 5,
    image: "./assets/item5.jpg",
    description: "Indulge in the pure, clean taste of Crystal Geyser Natural Alpine Spring Water with this 1.5-liter bottle. With a rating of 4.4 stars, it's an excellent choice for staying hydrated throughout the day.",
    reviews: [
      {
        customer: "Quincy",
        rating: 5,
        comment: "Love the size! Perfect for keeping on my desk at work."
      },
      {
        customer: "Rachel",
        rating: 4,
        comment: "Refreshing taste. Wish it was a bit cheaper though."
      },
      {
        customer: "Sam",
        rating: 4,
        comment: "Good value for the size. Keeps me hydrated during workouts."
      },
      {
        customer: "Tina",
        rating: 5,
        comment: "Always my go-to choice. Can't beat the taste!"
      }
    ]
  },
  {
    id: 6,
    productname: "Crystal Geyser Natural Alpine Spring Water, 12 Fl Oz",
    price: 0.6,
    size: 1,
    rating: 4.2,
    bottles: 6,
    image: "./assets/item6.png",
    description: "Grab a 6-pack of 12 fl oz bottles of Crystal Geyser Natural Alpine Spring Water for convenient hydration wherever you go. With a rating of 4.2 stars, it's a refreshing choice for any occasion.",
    reviews: [
      {
        customer: "Ursula",
        rating: 5,
        comment: "Perfect size for lunchboxes. Kids love them!"
      },
      {
        customer: "Victor",
        rating: 4,
        comment: "Good taste. Wish they were a bit cheaper though."
      },
      {
        customer: "Wendy",
        rating: 3,
        comment: "Decent water, but prefer larger bottles for home."
      },
      {
        customer: "Xander",
        rating: 5,
        comment: "Great for on-the-go. Keeps me hydrated during hikes."
      }
    ]
  },
  {
    id: 7,
    productname: "Crystal Geyser Natural Alpine Spring Water, 12 Fl Oz",
    price: 0.5,
    size: 1,
    rating: 4.8,
    bottles: 6,
    image: "./assets/item7.jpg",
    description: "Grab a 6-pack of 12 fl oz bottles of Crystal Geyser Natural Alpine Spring Water for convenient hydration wherever you go. With a rating of 4.2 stars, it's a refreshing choice for any occasion.",
    reviews: [
      {
        customer: "Ursula",
        rating: 5,
        comment: "Perfect size for lunchboxes. Kids love them!"
      },
      {
        customer: "Victor",
        rating: 4,
        comment: "Good taste. Wish they were a bit cheaper though."
      },
      {
        customer: "Wendy",
        rating: 3,
        comment: "Decent water, but prefer larger bottles for home."
      },
      {
        customer: "Xander",
        rating: 5,
        comment: "Great for on-the-go. Keeps me hydrated during hikes."
      }
    ]
  }
]
ngOnInit() {
  this.showProducts();
}

showProducts() {

}

storeProduct(product: any) {
  localStorage.setItem('selectedProduct', JSON.stringify(product));

  this.router.navigate(['/selecteditem'], { queryParams: product });

}
}
