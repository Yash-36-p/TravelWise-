import { Card } from "@/components/ui/card";

const places = [
  {
    name: "Shimla",
    description: "A charming hill station in Himachal Pradesh known for its colonial architecture, Mall Road, cool climate, and stunning views of the Himalayas.",
    image: "https://media.istockphoto.com/id/1318300669/photo/latest-views-of-snowfall-in-shimla.jpg?s=612x612&w=0&k=20&c=wZmPelTzmwwhIPuC0qtVn4BW1lVUQXAeY2Cqx4cdcwc=",
  },
  {
    name: "Goa",
    description: "India’s favorite beach destination famous for golden beaches, nightlife, water sports, seafood, and relaxed holiday vibes.",
    image: "https://imgcld.yatra.com/ytimages/image/upload/v1517481987/AdvNation/ANN_DES67/ann_top_Goa_loQGrP.jpg",
  },
  {
    name: "Leh",
    description: "A high-altitude desert town in Ladakh known for its monasteries, crystal-clear lakes, adventure trekking, and breathtaking mountain landscapes.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Leh_City_seen_from_Shanti_Stupa.JPG",
  },

  {
    name: "Ladakh",
    description: "A cold desert region famous for Pangong Lake, Nubra Valley, magnetic hills, Buddhist culture, and thrilling road trips on some of the world’s highest passes.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQeCA2YnVG40Sw0p0JLt-eylrn4MmQ0-5gYw&s",
  },

  {
    name: "Uttarakhand",
    description: "A scenic Himalayan state known for its temples, hill stations, spiritual centers, trekking routes, rivers, and natural beauty.",
    image: "https://static2.tripoto.com/media/filter/tst/img/415220/TripDocument/1521282178_istock_484389570.jpg",
  },

  {
    name: "Kerala",
    description: "Known as “God’s Own Country,” Kerala offers backwaters, lush greenery, houseboats, beaches, spices, and beautiful wildlife.",
    image: "https://assets.cntraveller.in/photos/65f445fc8411ed4511e9a4c9/master/pass/GettyImages-110051777.jpg",
  },

  {
    name: "Rishikesh",
    description: "The Yoga Capital of the World, known for river rafting, Ganga aarti, peaceful ashrams, adventure activities, and the Laxman Jhula bridge.",
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/03/24161936/Tourist-places-to-visit-in-Rishikesh-1600x900.jpg",
  },

  {
    name: "Kashmir",
    description: "Often called “Paradise on Earth,” Kashmir is known for snow-covered mountains, Dal Lake houseboats, tulip gardens, and breathtaking valleys.",
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2024/01/15134114/kashmir-deepanshu-nayak-1600x900.jpeg",
  },

  {
    name: "Agra",
    description: "Home to the iconic Taj Mahal, one of the world’s seven wonders, along with historic forts and Mughal architecture.",
    image: "https://imgcld.yatra.com/ytimages/image/upload/t_yt_blog_w_800_c_fill_g_auto_q_auto:good_f_jpg/v1534158986/AgraFort_1534158959.jpg",
  },
];

export default function Places() {
  return (
    <div className="min-h-screen bg-seasons py-10">
      <h1 className="text-4xl font-bold text-center mb-8 animate-pulse transition-all duration-10">
        Beautiful Places to Visit
      </h1>

      <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {places.map((place, index) => (
          <Card
            key={index}
            className="
              overflow-hidden shadow-md rounded-xl
              transform transition-all duration-300
              hover:scale-[1.05] hover:shadow-2xl cursor-pointer
            "
          >
            <div className="overflow-hidden">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover transition-all duration-500 hover:scale-110"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
              <p className="text-muted-foreground">{place.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
