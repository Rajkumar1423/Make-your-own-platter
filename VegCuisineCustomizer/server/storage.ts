import { 
  users, type User, type InsertUser,
  cuisines, type Cuisine, type InsertCuisine,
  dishes, type Dish, type InsertDish,
  bookings, type Booking, type InsertBooking,
  contacts, type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserByReplitId(replitId: string): Promise<User | undefined>;
  updateUserPreferences(replitId: string, preferences: any): Promise<User | undefined>;

  // Cuisine methods
  getCuisines(): Promise<Cuisine[]>;
  getCuisineById(id: number): Promise<Cuisine | undefined>;
  createCuisine(cuisine: InsertCuisine): Promise<Cuisine>;

  // Dish methods
  getDishes(): Promise<Dish[]>;
  getDishesByCuisineId(cuisineId: number): Promise<Dish[]>;
  getDishById(id: number): Promise<Dish | undefined>;
  createDish(dish: InsertDish): Promise<Dish>;

  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;

  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContactById(id: number): Promise<Contact | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cuisinesMap: Map<number, Cuisine>;
  private dishesMap: Map<number, Dish>;
  private bookingsMap: Map<number, Booking>;
  private contactsMap: Map<number, Contact>;

  userCurrentId: number;
  cuisineCurrentId: number;
  dishCurrentId: number;
  bookingCurrentId: number;
  contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.cuisinesMap = new Map();
    this.dishesMap = new Map();
    this.bookingsMap = new Map();
    this.contactsMap = new Map();

    this.userCurrentId = 1;
    this.cuisineCurrentId = 1;
    this.dishCurrentId = 1;
    this.bookingCurrentId = 1;
    this.contactCurrentId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize cuisines
    const cuisineData: InsertCuisine[] = [
      {
        name: "South Indian",
        description: "Authentic South Indian dishes with traditional flavors.",
        imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "North Indian",
        description: "Rich and flavorful dishes from North India.",
        imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Chinese",
        description: "Indo-Chinese fusion dishes with flavorful sauces.",
        imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Italian",
        description: "Authentic Italian vegetarian dishes.",
        imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Sweets",
        description: "Delicious traditional and fusion desserts from around the world.",
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Rice Items",
        description: "Flavorful variety of rice dishes from different regional cuisines.",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Veg Curries",
        description: "Delicious vegetable curries from various Indian regional cuisines.",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Chat",
        description: "Popular Indian street food snacks and savory treats.",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ];

    cuisineData.forEach(cuisine => this.createCuisine(cuisine));

    // Initialize dishes
    const dishData: InsertDish[] = [
      // South Indian (cuisineId: 1)
      {
        name: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potatoes.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Idly",
        description: "Soft steamed rice cakes, a South Indian breakfast staple.",
        price: "60",
        imageUrl: "https://images.unsplash.com/photo-1626776876729-bab4e4622756?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Button Idly",
        description: "Miniature idlis perfect for snacking or light meals.",
        price: "70",
        imageUrl: "https://images.unsplash.com/photo-1626776876729-bab4e4622756?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Tatta Idly",
        description: "Flat, disc-shaped idlis with a slightly different texture.",
        price: "75",
        imageUrl: "https://images.unsplash.com/photo-1626776876729-bab4e4622756?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Fried Idly",
        description: "Crispy fried idlis seasoned with spices, a delicious snack.",
        price: "85",
        imageUrl: "https://images.unsplash.com/photo-1626776876729-bab4e4622756?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Ragi Idly",
        description: "Nutritious idlis made with finger millet flour (ragi).",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1626776876729-bab4e4622756?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Kullad Idly",
        description: "Idlis served in traditional clay cups for an earthy flavor.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1626776876729-bab4e4622756?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Vegetable Idly",
        description: "Idlis with mixed vegetables incorporated into the batter.",
        price: "85",
        imageUrl: "https://images.unsplash.com/photo-1626776876729-bab4e4622756?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Medu Vada",
        description: "Savory lentil donuts with a crispy exterior and soft interior.",
        price: "70",
        imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Nellore Wada",
        description: "A regional specialty vada from Nellore with unique spicing.",
        price: "75",
        imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Onion Dosa",
        description: "Crispy dosa topped with sautéed onions and spices.",
        price: "110",
        imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potatoes.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Upma Dosa",
        description: "Fusion dish combining upma and dosa in a unique preparation.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Butter Dosa",
        description: "Dosa generously spread with butter for extra richness.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Pizza Dosa",
        description: "Fusion dosa topped with pizza-inspired toppings and cheese.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Benna Dosa",
        description: "Buttery dosa with a unique preparation style.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Net Roll Dosa",
        description: "Thin, net-patterned dosa rolled with fillings.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Schezwan Dosa",
        description: "Fusion dosa with spicy Schezwan sauce and vegetables.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Pongal",
        description: "Rice and lentil porridge with spices, a comforting dish.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1589554557863-9dc4673ff701?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Upma",
        description: "Savory semolina porridge with vegetables and spices.",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1589554557863-9dc4673ff701?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Tomato Bath",
        description: "Tangy rice dish cooked with tomatoes and spices.",
        price: "100",
        imageUrl: "https://images.unsplash.com/photo-1589554557863-9dc4673ff701?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Puri",
        description: "Deep-fried bread that puffs up, served with curry or chutney.",
        price: "70",
        imageUrl: "https://images.unsplash.com/photo-1589554557863-9dc4673ff701?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Mini Mysore Bhajji",
        description: "Small-sized crispy fritters Mysore style.",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Tomato Omlets",
        description: "Savory pancakes made with tomatoes and spices.",
        price: "85",
        imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Taj Dahi Wada",
        description: "Lentil fritters soaked in yogurt with special spices.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Tomato Bhatt",
        description: "Rice preparation with tomatoes and spices.",
        price: "95",
        imageUrl: "https://images.unsplash.com/photo-1589554557863-9dc4673ff701?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Tawa Mysore Bhajji",
        description: "Mysore-style fritters cooked on a tawa (griddle).",
        price: "85",
        imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Appam with Stew",
        description: "Lacy rice pancakes served with vegetable stew.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Tiger Tops",
        description: "Unique South Indian snack with a distinctive striped pattern.",
        price: "100",
        imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 1,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },

      // North Indian (cuisineId: 2)
      {
        name: "Paneer Butter Masala",
        description: "Cottage cheese in rich tomato gravy.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 2,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Dal Makhani",
        description: "Creamy black lentil stew.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1586377310720-6d2b7f6ebc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 2,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Chana Masala",
        description: "Spiced chickpeas in a savory sauce.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1616669944447-d65c0d9cc104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 2,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },

      // Chinese (cuisineId: 3)
      {
        name: "Veg Manchurian",
        description: "Vegetable dumplings in spicy sauce.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1600628860782-e80d020787e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Hakka Noodles",
        description: "Stir-fried noodles with vegetables.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Chilli Paneer",
        description: "Cottage cheese in spicy sauce.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a6db8cd8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Veg Manchow Soup",
        description: "Spicy and sour Chinese soup with vegetables and noodles.",
        price: "110",
        imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Hot & Sour Soup",
        description: "Tangy and spicy soup with mushrooms, tofu, and vegetables.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Veg Corn Soup",
        description: "Creamy corn soup with mixed vegetables.",
        price: "100",
        imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Tomato Soup",
        description: "Classic tomato soup with Chinese herbs and spices.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Veg Soft Noodles",
        description: "Soft, thin noodles stir-fried with vegetables.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Singapore Noodles",
        description: "Curry-flavored rice noodles with vegetables.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Tai Noodles",
        description: "Thai-style noodles with a spicy flavoring.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Hongkong Noodles",
        description: "Stir-fried noodles with vegetables in Hong Kong style.",
        price: "145",
        imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "American Chop Suey Veg",
        description: "Sweet and sour vegetables with crispy noodles.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Veg Chow Chow",
        description: "Mixed vegetable stir-fry with soy sauce.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1600628860782-e80d020787e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Veg Manchuria Dry",
        description: "Crispy vegetable balls tossed in spicy sauce.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1600628860782-e80d020787e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Veg Manchuria Wet",
        description: "Vegetable balls in a thick, spicy gravy.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1600628860782-e80d020787e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Veg Spring Roll",
        description: "Crispy rolls filled with vegetables and noodles.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1600628860782-e80d020787e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Veg Shanghai Roll",
        description: "Shanghai-style rolls with a spicy vegetable filling.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1600628860782-e80d020787e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Veg Fried Rice",
        description: "Rice stir-fried with mixed vegetables.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Shezwan Fried Rice",
        description: "Spicy rice stir-fried with vegetables and Szechuan sauce.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Thai Fried Rice",
        description: "Thai-flavored rice with vegetables and herbs.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Seven Jewel Fried Rice",
        description: "Rice stir-fried with seven different vegetables.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Chilly Baby Corn",
        description: "Crispy baby corn tossed in spicy sauce.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1623595119708-26b1f7500ddd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Paneer 65",
        description: "Spicy, deep-fried cottage cheese cubes.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a6db8cd8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Aloo 65",
        description: "Spicy, deep-fried potato cubes with Indo-Chinese spices.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1623595119708-26b1f7500ddd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 3,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },

      // Italian (cuisineId: 4)
      {
        name: "Margherita Pizza",
        description: "Classic tomato and cheese pizza.",
        price: "220",
        imageUrl: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Pasta Arrabbiata",
        description: "Pasta in spicy tomato sauce.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Tiramisu",
        description: "Classic Italian dessert.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea2553d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Cheese Qrisidilla",
        description: "Fusion quesadilla with Italian cheeses and herbs.",
        price: "220",
        imageUrl: "https://images.unsplash.com/photo-1600360561089-e4aa9d6e4451?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Veg Franky Paneer",
        description: "Paneer wrap with Italian seasoning and vegetables.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Franky Brutitis",
        description: "Spicy vegetable roll with bruschetta-inspired filling.",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1631515243454-733c5656292e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Lazaniya Nachose",
        description: "Fusion dish combining lasagna flavors with nacho presentation.",
        price: "210",
        imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Behal Taccos",
        description: "Italian-inspired vegetable tacos with special herbs.",
        price: "200",
        imageUrl: "https://images.unsplash.com/photo-1611699363906-056f01dd1ed8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Red Pasta",
        description: "Classic tomato-based pasta with Italian herbs.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "White Pasta",
        description: "Creamy white sauce pasta with vegetables.",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Spegati Pasta",
        description: "Traditional spaghetti with rich vegetable sauce.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Rawoli Pasta",
        description: "Homemade ravioli filled with vegetable and cheese.",
        price: "210",
        imageUrl: "https://images.unsplash.com/photo-1589187151053-5ec8818e661b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Mini Pizza",
        description: "Personal-sized vegetarian pizzas with assorted toppings.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Fire Pizza",
        description: "Spicy pizza with hot peppers and special sauce.",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Volvols",
        description: "Unique Italian vegetable rolls with cheese filling.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1581618048587-9e35f4a63a2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Mini Lazaniya Sizzler",
        description: "Individual lasagna served on a sizzling plate.",
        price: "230",
        imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Paneer Sharwarma",
        description: "Italian-spiced paneer in a wrap with vegetables.",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1581513463434-5ea7e2e16647?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Assorted Kebab",
        description: "Vegetable and cheese kebabs with Italian herbs.",
        price: "210",
        imageUrl: "https://images.unsplash.com/photo-1619221882266-8708511c985e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Baked Pav Bhaji",
        description: "Fusion dish combining Indian pav bhaji with Italian baking techniques.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Corn Arepas",
        description: "Italian-inspired corn cakes with vegetable toppings.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1626725451050-6e24377cb825?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Murtabak",
        description: "Italian-style stuffed flatbread with vegetable filling.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Corn Cheese Palak",
        description: "Spinach, corn and cheese bake with Italian seasoning.",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Falafal Brushchatta",
        description: "Fusion of Middle Eastern falafel served on Italian bruschetta.",
        price: "200",
        imageUrl: "https://images.unsplash.com/photo-1593002585926-9f7ace1c8e6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 4,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },

      // Sweets (cuisineId: 5)
      {
        name: "Boondi Laddu",
        description: "Sweet spherical treats made with fried gram flour pearls and sugar syrup.",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1613294326047-28da176077ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Mothichur Laddu",
        description: "Delicate sweet made with fine fried gram flour bits and aromatic flavors.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1613294326047-28da176077ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Khowa Bobbattlu",
        description: "Sweet flatbread stuffed with sweetened khoya (milk solids) filling.",
        price: "100",
        imageUrl: "https://images.unsplash.com/photo-1559620192-85bd2aa73ded?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Semiya Payasam",
        description: "Sweet vermicelli pudding with milk, sugar, and nuts.",
        price: "70",
        imageUrl: "https://images.unsplash.com/photo-1615719413546-198b11915441?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Gulab Jamoon",
        description: "Deep-fried milk solids soaked in sugar syrup with cardamom and rose.",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1598614187854-26a60e982dc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Kala Jamoon",
        description: "Dark variant of gulab jamoon with a deeper caramelized flavor.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1598614187854-26a60e982dc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Malai Sandwich",
        description: "Layered sweet treat with cream, fruits, and nuts.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1593404234702-99f525ba90a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Tawa Sweet",
        description: "Griddle-cooked sweet delicacy with semolina, sugar, and flavors.",
        price: "100",
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Carrot Halwa",
        description: "Sweet pudding made of grated carrots, milk, sugar, and ghee.",
        price: "110",
        imageUrl: "https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Gaajar ka Halwa",
        description: "Traditional carrot pudding with cardamom and pistachios.",
        price: "110",
        imageUrl: "https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Kesar Jilebi",
        description: "Saffron-flavored crispy funnel cake soaked in sugar syrup.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1589921196392-58aa2e8eccb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Paneer Jilebi",
        description: "Jilebi made with cottage cheese for added richness.",
        price: "100",
        imageUrl: "https://images.unsplash.com/photo-1589921196392-58aa2e8eccb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Jilebi with Rabdi",
        description: "Crispy jilebi served with thickened sweetened milk.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1589921196392-58aa2e8eccb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Rasmalai",
        description: "Soft cheese patties soaked in saffron and cardamom milk.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1620921568796-27aeee4c4057?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Rasagulla",
        description: "Soft, spongy cheese balls soaked in sugar syrup.",
        price: "100",
        imageUrl: "https://images.unsplash.com/photo-1620921568796-27aeee4c4057?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Basundi",
        description: "Rich, condensed milk dessert flavored with cardamom and nuts.",
        price: "110",
        imageUrl: "https://images.unsplash.com/photo-1615719413546-198b11915441?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Kaju Kathli",
        description: "Diamond-shaped cashew fudge with silver foil garnish.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1590080687589-8cec99d6e323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Badam Kathli",
        description: "Delicate almond fudge cut into diamond shapes.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1590080687589-8cec99d6e323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Triffal Pudding",
        description: "Three-layer pudding with unique flavors and textures.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1550617931-25e6f4c15f3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Apricot Pudding",
        description: "Creamy pudding with sweet apricot flavor.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1550617931-25e6f4c15f3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Panchratan Halwa",
        description: "Five jewel halwa made with mixed fruits and nuts.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Baked Kunafa",
        description: "Middle Eastern sweet made with thin noodles, cheese, and syrup.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Baked Rasgulla",
        description: "Baked version of classic rasgulla with a caramelized layer.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1620921568796-27aeee4c4057?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Dry Fruit Sharwarma",
        description: "Sweet roll with mixed dry fruits and honey.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1590080687589-8cec99d6e323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Sitaphal Matki",
        description: "Custard apple pudding served in a clay pot.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1615719413546-198b11915441?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Mango Raska",
        description: "Rich mango dessert with cream and spices.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Kaju Bhujia",
        description: "Sweet cashew snack with cardamom and saffron.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1590080687589-8cec99d6e323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Badam Bhujia",
        description: "Almond sweet snack with aromatic spices.",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1590080687589-8cec99d6e323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Orange Blossam",
        description: "Delicate orange-flavored sweet treat with floral notes.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Cocunut Malai",
        description: "Creamy coconut dessert with cardamom.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1615719413546-198b11915441?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Blueberry Shorts",
        description: "Short pastry with blueberry filling.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Lichi Boat",
        description: "Lychee-based dessert in a boat-shaped presentation.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Kiwi Boat",
        description: "Kiwi-based dessert presented in a boat shape.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Tiranga Katli",
        description: "Tricolor Indian flag-inspired milk fudge.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1590080687589-8cec99d6e323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Butter Scotch Indra Puri",
        description: "Butterscotch-flavored puffed sweet.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Dry Fruit Taka Tak",
        description: "Mixed dry fruit sweet preparation with a unique texture.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1590080687589-8cec99d6e323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Badam Lachedar Cake",
        description: "Layered almond cake with intricate textures.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1562440499-64c9a111f713?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Gevar",
        description: "Disc-shaped sweet cake made with ghee and milk.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Lachedar Anjeer Pak",
        description: "Layered fig-based sweet with delicate textures.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Dry Fruit Basket",
        description: "Assortment of dry fruit sweets in a basket presentation.",
        price: "200",
        imageUrl: "https://images.unsplash.com/photo-1590080687589-8cec99d6e323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Baklava Mela",
        description: "Assorted baklava with different fillings and flavors.",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Bites Fusion",
        description: "Small fusion sweet bites with unique flavor combinations.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 5,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },

      // Rice Items (cuisineId: 6)
      {
        name: "Veg Dum Biryani",
        description: "Fragrant basmati rice with mixed vegetables, slow-cooked with aromatic spices.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Jack Fruit Biryani",
        description: "Unique biryani variation with tender jackfruit pieces as the main ingredient.",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Mushroom Biryani",
        description: "Aromatic rice dish with assorted mushrooms and fragrant spices.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Avakaya Biryani",
        description: "Spicy biryani flavored with traditional mango pickle (avakaya).",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Veg Pulav",
        description: "Light and fragrant rice cooked with mixed vegetables and mild spices.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1567604130959-7be155893012?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Kaju Peas Pulav",
        description: "Pulav prepared with green peas and cashews for added texture and flavor.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1567604130959-7be155893012?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Bagara Rice",
        description: "Rice cooked with a special tempering of spices and herbs.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1567604130959-7be155893012?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Tomato Rice",
        description: "Tangy rice dish cooked with fresh tomatoes and traditional spices.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Sambar Rice",
        description: "Comforting rice mixed with flavorful lentil and vegetable stew.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Lemon Rice",
        description: "Zesty rice flavored with fresh lemon juice, mustard seeds, and curry leaves.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Pulihora",
        description: "Traditional tamarind rice with peanuts and a blend of spices.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Pudina Rice",
        description: "Refreshing mint-flavored rice with green chilies and spices.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Mango Rice",
        description: "Seasonal rice dish made with raw mango and tempering spices.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Palak Rice",
        description: "Nutritious spinach-flavored rice with subtle spices.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Coconut Rice",
        description: "Fragrant rice cooked with fresh coconut and tempered with mustard seeds and curry leaves.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Jeera Rice",
        description: "Basmati rice flavored with cumin seeds and subtle spices.",
        price: "130",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Veg Fried Rice",
        description: "Stir-fried rice with mixed vegetables and soy sauce.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Curd Rice",
        description: "Cooling rice mixed with yogurt, tempered with mustard seeds and curry leaves.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Avakaya Rice",
        description: "Rice mixed with spicy mango pickle for a tangy, flavorful experience.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 6,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },

      // These methods are defined as static exports not part of the class

  // Veg Curries (cuisineId: 7)
      {
        name: "Mix Veg Curry",
        description: "Medley of seasonal vegetables in a flavorful curry sauce.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Kadai Vegetable",
        description: "Vegetables cooked in a spicy kadai masala with bell peppers and onions.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Veg Kolhapuri",
        description: "Spicy vegetable curry prepared with special Kolhapuri masala.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Veg Chatpat",
        description: "Tangy and spicy vegetable curry with a distinctive flavor profile.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Methi Chaman",
        description: "Paneer and fenugreek leaves in a rich, creamy gravy.",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Navratan Kurma",
        description: "Nine gems curry with vegetables, fruits, and nuts in a creamy sauce.",
        price: "200",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Corn Palak",
        description: "Sweet corn kernels cooked with spinach puree and spices.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Mushrum Kaju Curry",
        description: "Mushrooms and cashews in a rich, creamy gravy.",
        price: "190",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Mushrum Veg Curry",
        description: "Mushrooms and mixed vegetables in a flavorful curry sauce.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Alu Capsicum Curry",
        description: "Potatoes and bell peppers in a spiced tomato-based gravy.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Palak Baby Corn",
        description: "Tender baby corn in a creamy spinach gravy.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Baby Corn Veg Curry",
        description: "Baby corn and mixed vegetables in a flavorful curry sauce.",
        price: "180",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Gutti Vankaya",
        description: "Stuffed eggplant curry, a specialty from Andhra cuisine.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Tomato Munakkaya",
        description: "Drumsticks cooked in a tangy tomato-based curry.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Alu Tomato Green Peas",
        description: "Potatoes, tomatoes, and green peas cooked together in a savory curry.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Alu Mutter",
        description: "Classic North Indian curry with potatoes and green peas.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Alu Palak",
        description: "Potatoes cooked in a creamy spinach sauce.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Alu Gobi",
        description: "Traditional curry with potatoes and cauliflower.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Channa Masala",
        description: "Spicy chickpea curry with onions, tomatoes, and aromatic spices.",
        price: "160",
        imageUrl: "https://images.unsplash.com/photo-1616669944447-d65c0d9cc104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Green Peas Masala",
        description: "Green peas in a flavorful, spiced tomato-based gravy.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Mirchi",
        description: "Spicy green chili curry prepared in traditional style.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Tomato Curry",
        description: "Tangy curry made primarily with fresh tomatoes and spices.",
        price: "140",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Bagara Baingan",
        description: "Hyderabadi eggplant curry with coconut, peanuts, and sesame seeds.",
        price: "170",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Capsicum Masala",
        description: "Bell peppers in a thick, spicy gravy with onions and tomatoes.",
        price: "150",
        imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 7,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },

      // Chat (cuisineId: 8)
      {
        name: "Samosa Ragada",
        description: "Crispy samosa topped with spicy white peas curry, chutneys, and sev.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fitcrop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Cutlet Ragada",
        description: "Vegetable cutlet topped with spicy white peas curry and chutneys.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Lacha Cutlet",
        description: "Layered vegetable cutlet with crispy exterior and soft filling.",
        price: "95",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Paneer Tikka Pav Bhaji",
        description: "Classic pav bhaji topped with paneer tikka pieces.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Cut Pav Bhaji",
        description: "Traditional Mumbai-style pav bhaji with finely chopped vegetables.",
        price: "100",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Paneer Chilwa",
        description: "Thin paneer pancakes with spices and herbs.",
        price: "110",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Chole Kulcha",
        description: "Spicy chickpea curry served with soft leavened bread.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Anguri Dahi Wada",
        description: "Lentil fritters in yogurt topped with grape-shaped sweet and sour droplets.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Malai Dahi Wada",
        description: "Lentil fritters soaked in creamy yogurt with malai (cream) topping.",
        price: "95",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Dahi Komcha Chat",
        description: "Unique chat preparation with yogurt and special komcha spice blend.",
        price: "85",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Kanji Wada",
        description: "Fermented mustard-flavored water with crispy lentil fritters.",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Belma Puri",
        description: "Crispy puris topped with potatoes, chutneys, and sev.",
        price: "85",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Dhahi Puri",
        description: "Hollow puris filled with potatoes, yogurt, and chutneys.",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Sev Puri",
        description: "Crispy puris topped with potatoes, onions, chutneys, and sev.",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Dhahi Papadi",
        description: "Crispy papadi with yogurt, potatoes, and sweet and tangy chutneys.",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: false,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Corn Chat",
        description: "Sweet corn kernels mixed with spices, lemon, and herbs.",
        price: "85",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Kachori",
        description: "Deep-fried pastry filled with spiced lentils or peas.",
        price: "70",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Dahi Wada",
        description: "Soft lentil fritters soaked in yogurt with spices and chutneys.",
        price: "85",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: false,
        isGlutenFree: true,
        isPopular: true
      },
      {
        name: "Alu Toast",
        description: "Toasted bread topped with spiced mashed potatoes.",
        price: "75",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Pani Puri",
        description: "Hollow crispy puris filled with spiced water, potatoes, and chickpeas.",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Mutter Pothila",
        description: "Green peas wrapped in thin potato slices and fried until crispy.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Kulcha Paneer Lifafa",
        description: "Kulcha bread stuffed with paneer and folded like an envelope.",
        price: "100",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: false,
        isGlutenFree: false,
        isPopular: false
      },
      {
        name: "Asorted Tikka",
        description: "Assortment of grilled vegetable tikkas with special spices.",
        price: "120",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Wada Pav",
        description: "Spicy potato fritter in a soft bun with chutneys.",
        price: "70",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Moonglets",
        description: "Savory pancakes made from moong dal (split yellow lentils).",
        price: "80",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Masala Sandwich",
        description: "Grilled sandwich with spiced potato filling and chutneys.",
        price: "75",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: false,
        isPopular: true
      },
      {
        name: "Corn Mayoneese Chat",
        description: "Sweet corn mixed with mayonnaise, spices, and herbs.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: false,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Palak Corn Chat",
        description: "Spinach and corn mixture seasoned with chat masala and lemon.",
        price: "90",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Hari Boot ki Chat",
        description: "Green chickpeas seasoned with spices and lemon juice.",
        price: "85",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      },
      {
        name: "Kanghan Chat",
        description: "Unique chat preparation with a mix of lentils and vegetables.",
        price: "85",
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        cuisineId: 8,
        isVegan: true,
        isGlutenFree: true,
        isPopular: false
      }
    ];

    dishData.forEach(dish => this.createDish(dish));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserByReplitId(replitId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.replitId === replitId);
  }

  async updateUserPreferences(replitId: string, preferences: any): Promise<User | undefined> {
    const user = Array.from(this.users.values()).find(user => user.replitId === replitId);
    if (user) {
      user.preferences = preferences;
      user.updatedAt = new Date();
      return user;
    }
    return undefined;
  }

  // Cuisine methods
  async getCuisines(): Promise<Cuisine[]> {
    return Array.from(this.cuisinesMap.values());
  }

  async getCuisineById(id: number): Promise<Cuisine | undefined> {
    return this.cuisinesMap.get(id);
  }

  async createCuisine(insertCuisine: InsertCuisine): Promise<Cuisine> {
    const id = this.cuisineCurrentId++;
    const cuisine: Cuisine = { ...insertCuisine, id };
    this.cuisinesMap.set(id, cuisine);
    return cuisine;
  }

  // Dish methods
  async getDishes(): Promise<Dish[]> {
    return Array.from(this.dishesMap.values());
  }

  async getDishesByCuisineId(cuisineId: number): Promise<Dish[]> {
    return Array.from(this.dishesMap.values()).filter(
      (dish) => dish.cuisineId === cuisineId
    );
  }

  async getDishById(id: number): Promise<Dish | undefined> {
    return this.dishesMap.get(id);
  }

  async createDish(insertDish: InsertDish): Promise<Dish> {
    const id = this.dishCurrentId++;
    const dish: Dish = { ...insertDish, id };
    this.dishesMap.set(id, dish);
    return dish;
  }

  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingCurrentId++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(), 
      status: "pending" 
    };
    this.bookingsMap.set(id, booking);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookingsMap.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookingsMap.get(id);
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(), 
      isRead: false 
    };
    this.contactsMap.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contactsMap.values());
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    return this.contactsMap.get(id);
  }
}

// Create a storage instance to use
const memStorage = new MemStorage();

// Define the functions that operate on memStorage
async function getCuisines() {
  return memStorage.getCuisines();
}

async function getCuisineById(id: number) {
  return memStorage.getCuisineById(id);
}

async function getDishes() {
  return memStorage.getDishes();
}

async function getDishesByCuisineId(cuisineId: number) {
  return memStorage.getDishesByCuisineId(cuisineId);
}

async function getDishById(id: number) {
  return memStorage.getDishById(id);
}

async function createBooking(booking: InsertBooking) {
  return memStorage.createBooking(booking);
}

async function createContact(contact: InsertContact) {
  return memStorage.createContact(contact);
}

async function getUserByReplitId(replitId: string) {
  return memStorage.getUserByReplitId(replitId);
}

async function createUser(user: InsertUser) {
  return memStorage.createUser(user);
}

async function updateUserPreferences(replitId: string, preferences: any) {
  return memStorage.updateUserPreferences(replitId, preferences);
}

export const storage = {
  getCuisines,
  getCuisineById,
  getDishes,
  getDishesByCuisineId,
  getDishById,
  createBooking,
  createContact,
  getUserByReplitId,
  createUser,
  updateUserPreferences,
};