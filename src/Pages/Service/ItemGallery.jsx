import React, { useEffect, useState } from 'react';

import "./service.scss"
import { Link } from 'react-router-dom';
import itemImage from "../../Assets/Images/birdspa.jpg"
import itemImage2 from "../../Assets/Images/bird_hero.png"
import Rating from './Rating';


const ItemGallery = ({ category, onItemClick }) => {
  const [randomImage, setRandomImage] = useState('');

  const items = [
    {
      id: 7,
      name: 'New Medical Spa',
      category: 'Medical',
      rating: 5.0,
      phone: '092456711',
      address: '12 Tran Hung Dao, Ho Chi Minh',
      provider: 'Provider B',
      description: 'Experience relaxation like never before at New Medical Spa. Our state-of-the-art facility offers a wide range of therapeutic treatments and rejuvenating therapies. Our expert staff is dedicated to ensuring your well-being and providing you with a tranquil and revitalizing experience. Come and unwind with us.',
      price: 120
    },
    {
      id: 8,
      name: 'Revitalize Wellness Center',
      category: 'Medical',
      rating: 5.0,
      phone: '092456711',
      address: '12 Tran Hung Dao, Ho Chi Minh',
      provider: 'Provider B',
      description: 'Indulge in ultimate self-care at Revitalize Wellness Center. We offer an array of services designed to promote your physical and mental well-being. From soothing massages to holistic therapies, our skilled practitioners are here to enhance your health and vitality. Join us for a transformative journey to wellness.',
      price: 120
    },
    {
      id: 9,
      name: "Tranquil Retreat Hotel",
      category: "Hotel",
      rating: 4.7,
      phone: "0912345678",
      address: "123 Riverside Drive, Ho Chi Minh",
      provider: "Provider E",
      description: "Experience tranquility at Tranquil Retreat Hotel, where comfort meets elegance. Our luxurious rooms, exceptional service, and breathtaking views of the river ensure a relaxing stay. Recharge and unwind with us.",
      price: 180
    },
    {
      id: 10,
      name: "Royal Oasis Hotel",
      category: "Hotel",
      rating: 4.5,
      phone: "0898765432",
      address: "456 Park Avenue, Ho Chi Minh",
      provider: "Provider F",
      description: "Indulge in regal luxury at Royal Oasis Hotel. Our opulent suites, gourmet dining, and impeccable service create an unforgettable experience. Embrace the royal treatment during your stay.",
      price: 220
    },
    {
      id: 11,
      name: "Wellness Plus Clinic",
      category: "Medical",
      rating: 4.6,
      phone: "0978901234",
      address: "789 Health Street, Ho Chi Minh",
      provider: "Provider G",
      description: "Prioritize your well-being at Wellness Plus Clinic. Our experienced medical team offers comprehensive healthcare services, from preventive care to specialized treatments. Your health is our priority.",
      price: 90
    },
    {
      id: 12,
      name: "Healing Haven Medical Center",
      category: "Medical",
      rating: 4.8,
      phone: "0965432109",
      address: "101 Vitality Avenue, Ho Chi Minh",
      provider: "Provider H",
      description: "Discover the Healing Haven Medical Center, where holistic well-being meets advanced medicine. Our integrated approach to healing includes traditional and alternative therapies to optimize your well-being.",
      price: 110
    },
    {
      id: 13,
      name: "Sunset View Resort",
      category: "Hotel",
      rating: 4.9,
      phone: "0912345678",
      address: "321 Beachside Road, Ho Chi Minh",
      provider: "Provider I",
      description: "Enjoy breathtaking sunsets at Sunset View Resort. Our beachfront property offers luxurious accommodations, seaside dining, and a serene atmosphere for a perfect getaway.",
      price: 250
    },
    {
      id: 14,
      name: "Mountain Retreat Lodge",
      category: "Hotel",
      rating: 4.4,
      phone: "0898765432",
      address: "789 Alpine Avenue, Ho Chi Minh",
      provider: "Provider J",
      description: "Escape to the tranquil mountains at Mountain Retreat Lodge. Cozy cabins, hiking trails, and a rustic charm await you. Experience nature at its best.",
      price: 170
    },
    {
      id: 15,
      name: "VitalCare Medical Center",
      category: "Medical",
      rating: 4.7,
      phone: "0978901234",
      address: "456 Wellness Street, Ho Chi Minh",
      provider: "Provider K",
      description: "Prioritize your health at VitalCare Medical Center. Our team of experts offers comprehensive medical services, from wellness check-ups to specialized treatments, to keep you in the best of health.",
      price: 95
    },
    {
      id: 16,
      name: "Holistic Healing Hub",
      category: "Medical",
      rating: 4.6,
      phone: "0965432109",
      address: "567 Mindfulness Road, Ho Chi Minh",
      provider: "Provider L",
      description: "Embark on a journey to holistic well-being at the Holistic Healing Hub. Our therapies, including yoga and mindfulness, promote physical, mental, and emotional balance.",
      price: 120
    },
    {
      id: 17,
      name: "Lakeside Lodge & Spa",
      category: "Hotel",
      rating: 4.5,
      phone: "0912345678",
      address: "101 Lakeshore Drive, Ho Chi Minh",
      provider: "Provider M",
      description: "Experience serenity at Lakeside Lodge & Spa. Our lakeside retreat offers luxurious rooms, spa treatments, and picturesque views for a peaceful escape.",
      price: 200
    },
    {
      id: 18,
      name: "Urban Elegance Hotel",
      category: "Hotel",
      rating: 4.8,
      phone: "0898765432",
      address: "456 Metropolitan Avenue, Ho Chi Minh",
      provider: "Provider N",
      description: "Discover the epitome of urban elegance at Urban Elegance Hotel. Our modern design, gourmet dining, and impeccable service cater to your sophisticated tastes.",
      price: 230
    },
    {
      id: 19,
      name: "Holistic Health Institute",
      category: "Medical",
      rating: 4.5,
      phone: "0901234567",
      address: "789 Harmony Avenue, Ho Chi Minh",
      provider: "Provider O",
      description: "Explore holistic healing at Holistic Health Institute. Our experts offer a range of therapies, from acupuncture to herbal medicine, to promote well-being and balance in your life.",
      price: 110
    },
    {
      id: 20,
      name: "Harmony Medical Clinic",
      category: "Medical",
      rating: 4.6,
      phone: "0912345678",
      address: "456 Wellness Lane, Ho Chi Minh",
      provider: "Provider P",
      description: "Discover inner harmony at Harmony Medical Clinic. We specialize in holistic treatments, including meditation and yoga, to enhance your physical and mental health.",
      price: 95
    },
    {
      id: 21,
      name: "Serene Wellness Center",
      category: "Medical",
      rating: 4.7,
      phone: "0923456789",
      address: "101 Serenity Street, Ho Chi Minh",
      provider: "Provider Q",
      description: "Find serenity at Serene Wellness Center. Our comprehensive wellness services, including nutritional counseling and stress management, empower you to live a healthier life.",
      price: 120
    },
    {
      id: 22,
      name: "Vital Life Clinic",
      category: "Medical",
      rating: 4.8,
      phone: "0934567890",
      address: "123 Vitality Road, Ho Chi Minh",
      provider: "Provider R",
      description: "Prioritize your vitality at Vital Life Clinic. Our team of healthcare professionals offers personalized wellness plans and advanced medical care to optimize your health.",
      price: 100
    },
    {
      id: 23,
      name: "Mindful Healing Center",
      category: "Medical",
      rating: 4.6,
      phone: "0945678901",
      address: "456 Mindfulness Place, Ho Chi Minh",
      provider: "Provider S",
      description: "Embrace mindfulness at Mindful Healing Center. Our therapies, including mindfulness meditation and cognitive-behavioral therapy, promote mental well-being and emotional balance.",
      price: 110
    },
    {
      id: 24,
      name: "Wellness Connection Clinic",
      category: "Medical",
      rating: 4.7,
      phone: "0956789012",
      address: "789 Wellness Avenue, Ho Chi Minh",
      provider: "Provider T",
      description: "Connect with wellness at Wellness Connection Clinic. Our integrative approach combines traditional and alternative medicine to optimize your overall health.",
      price: 105
    },
    {
      id: 25,
      name: "Renewed Health Center",
      category: "Medical",
      rating: 4.8,
      phone: "0967890123",
      address: "101 Renewal Road, Ho Chi Minh",
      provider: "Provider U",
      description: "Experience renewed health at Renewed Health Center. Our team offers regenerative therapies and personalized health plans to revitalize your life.",
      price: 120
    },
    {
      id: 26,
      name: "Integrative Healing Hub",
      category: "Medical",
      rating: 4.9,
      phone: "0978901234",
      address: "123 Integrative Lane, Ho Chi Minh",
      provider: "Provider V",
      description: "Explore integrative healing at Integrative Healing Hub. We combine traditional and complementary therapies to address the root causes of health issues.",
      price: 115
    },
    {
      id: 27,
      name: "Inner Balance Clinic",
      category: "Medical",
      rating: 4.7,
      phone: "0989012345",
      address: "456 Balance Street, Ho Chi Minh",
      provider: "Provider W",
      description: "Find inner balance at Inner Balance Clinic. Our holistic treatments, including acupuncture and meditation, promote harmony in your body and mind.",
      price: 110
    },
    {
      id: 28,
      name: "Revive Wellness Institute",
      category: "Medical",
      rating: 4.8,
      phone: "0990123456",
      address: "789 Revival Road, Ho Chi Minh",
      provider: "Provider X",
      description: "Revive your well-being at Revive Wellness Institute. Our range of wellness services, from nutritional counseling to detox programs, support your journey to health.",
      price: 125
    },
    {
      id: 29,
      name: "Feathered Friends Retreat",
      category: "Spa",
      rating: 4.6,
      phone: "0901234567",
      address: "123 Avian Avenue, Ho Chi Minh",
      provider: "Provider AA",
      description: "Treat your feathered friends to a relaxing escape at Feathered Friends Retreat. Our avian experts provide gentle grooming, soothing baths, and enriching activities to keep your birds healthy and happy.",
      price: 45
    },
    {
      id: 30,
      name: "Avian Oasis Spa",
      category: "Spa",
      rating: 4.7,
      phone: "0912345678",
      address: "456 Winged Way, Ho Chi Minh",
      provider: "Provider BB",
      description: "Pamper your avian companions at Avian Oasis Spa. Our bird-friendly treatments include feather conditioning, nail trims, and therapeutic massages, ensuring your birds' well-being.",
      price: 50
    },
    {
      id: 31,
      name: "Winged Serenity Spa",
      category: "Spa",
      rating: 4.8,
      phone: "0923456789",
      address: "789 Plumage Place, Ho Chi Minh",
      provider: "Provider CC",
      description: "Find winged serenity at Winged Serenity Spa. Our experienced staff offers a range of avian therapies, from beak shaping to stress-relief sessions, to keep your birds content.",
      price: 55
    },
    {
      id: 32,
      name: "Plumage Paradise Spa",
      category: "Spa",
      rating: 4.9,
      phone: "0934567890",
      address: "101 Feathered Lane, Ho Chi Minh",
      provider: "Provider DD",
      description: "Experience plumage paradise at Plumage Paradise Spa. Our spa services for birds include feather rejuvenation, soothing baths, and nutritional consultations for their overall well-being.",
      price: 60
    },
    {
      id: 33,
      name: "Songbird Sanctuary",
      category: "Spa",
      rating: 4.7,
      phone: "0945678901",
      address: "456 Songbird Street, Ho Chi Minh",
      provider: "Provider EE",
      description: "Create a songbird sanctuary at our spa. Our expert staff specializes in avian vocal training, feather care, and relaxation techniques for your feathered companions.",
      price: 48
    },
    {
      id: 34,
      name: "Tropical Tweets Spa",
      category: "Spa",
      rating: 4.8,
      phone: "0956789012",
      address: "789 Tropics Terrace, Ho Chi Minh",
      provider: "Provider FF",
      description: "Treat your tropical birds to a spa day at Tropical Tweets Spa. We offer gentle beak trims, feather styling, and enriching activities to keep your birds chirping with joy.",
      price: 52
    },
    {
      id: 35,
      name: "Avian Harmony Haven",
      category: "Spa",
      rating: 4.6,
      phone: "0967890123",
      address: "101 Harmony Hill, Ho Chi Minh",
      provider: "Provider GG",
      description: "Discover avian harmony at Avian Harmony Haven. Our spa services include feather massages, wing stretches, and relaxing baths to promote your birds' well-being.",
      price: 47
    },
    {
      id: 36,
      name: "Feathered Delight Spa",
      category: "Spa",
      rating: 4.7,
      phone: "0978901234",
      address: "456 Featherside Road, Ho Chi Minh",
      provider: "Provider HH",
      description: "Indulge your feathered companions at Feathered Delight Spa. Our avian specialists offer feather fluffing, talon trims, and beak care to keep your birds in top form.",
      price: 49
    },
    {
      id: 37,
      name: "Birdsong Retreat",
      category: "Spa",
      rating: 4.8,
      phone: "0989012345",
      address: "789 Avian Avenue, Ho Chi Minh",
      provider: "Provider II",
      description: "Experience the beauty of birdsong at Birdsong Retreat. We offer a variety of avian treatments, from claw conditioning to vocal coaching, to enhance your birds' lives.",
      price: 53
    },
    {
      id: 38,
      name: "Paradise Plumage Spa",
      category: "Spa",
      rating: 4.9,
      phone: "0990123456",
      address: "101 Paradise Place, Ho Chi Minh",
      provider: "Provider JJ",
      description: "Create a paradise for your birds at Paradise Plumage Spa. Our avian experts provide feather rejuvenation, stress relief, and bird-friendly enrichment for a joyful flock.",
      price: 58
    }
  ];

  let categoryItems = [];

  if (category === 'All' || !category) {
    categoryItems = items;
  } else {
    categoryItems = items.filter((item) => item.category === category);
  }


  // useEffect(() => {
  //   const fetchRandomImage = async () => {
  //     try {
  //       const response = await fetch('https://picsum.photos/200/300');
  //       if (response.ok) {
  //         const imageUrl = response.url;
  //         setRandomImage(imageUrl);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching random image:', error);
  //     }
  //   };

  //   fetchRandomImage();
  // }, []);

  return (
    <div className="item-gallery">
      {categoryItems.map((item) => (
        <div key={item.id} className="item" onClick={() => onItemClick(item)}>

          <div className="item-content">
            <div className="item-image">
              <img src={itemImage} alt={item.name} />
            </div>
            <div className="item-name">{item.name}</div>
            <div className="item-description"> 
            {item.description.length > 100
              ? item.description.slice(0, 100) + '...' 
              : item.description}</div>
            <div className='item-rating'>
              <Rating rating={item.rating} />
            </div>
            <div className="flex justify-between">
              <div className="item-price-detail">${item.price}/Day</div>
              <Link to={`/detail/${item.id}`}>
                <button className="book-now-button">BOOK NOW</button>
              </Link>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ItemGallery;
