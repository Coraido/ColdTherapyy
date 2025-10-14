export interface Flavor {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export const flavors: Flavor[] = [
  { 
    id: 1, 
    name: 'Chocolate', 
    price: 180,
    image: 'https://media.istockphoto.com/id/1147619017/photo/chocolate-ice-cream.jpg?s=612x612&w=0&k=20&c=StYgL_7bvR3weuU41Y6247Y0GbQ14kyQM7XSJvV-l3c=',
    description: 'Rich and creamy chocolate delight'
  },
  { 
    id: 2, 
    name: 'Vanilla', 
    price: 180,
    image: 'https://media.istockphoto.com/id/684032230/photo/vanilla-ice-cream.jpg?s=612x612&w=0&k=20&c=100QMQUQPQPh54E3Ts0xbxMwBXkyLCG-kHOqBEHjFuk=',
    description: 'Classic smooth vanilla'
  },
  { 
    id: 3, 
    name: 'Strawberry', 
    price: 180,
    image: 'https://media.istockphoto.com/id/89354611/photo/many-scoops-of-pink-strawberry-ice-cream-as-a-background.jpg?s=612x612&w=0&k=20&c=y6-D_UkL5GQeLsglXH4Uz84EUjYs9RSRfGrN6UVxJOE=',
    description: 'Sweet and fruity strawberry'
  },
  { 
    id: 4, 
    name: 'Mint Chocolate Chip', 
    price: 195,
    image: 'https://media.istockphoto.com/id/1279996775/photo/extreme-close-up-of-green-ice-cream-being-scooped-up.jpg?s=612x612&w=0&k=20&c=iztwe-L55mj5Y353SCvmTIkx0o1Y2PYuRwpksDHyCZY=',
    description: 'Refreshing mint with chocolate chips'
  },
  { 
    id: 5, 
    name: 'Double Dutch', 
    price: 195,
    image: 'https://media.istockphoto.com/id/1270959289/photo/soft-focus-of-ice-cream-cone-a-hand-holding-an-ice-cream-cone-with-scoop-of-chocolate-and.jpg?s=612x612&w=0&k=20&c=aRgoFFxlv3ggXyT43fiV8ej3oHgQP21HJ9Emlvhhv0o=',
    description: 'Double chocolate indulgence'
  },
  { 
    id: 6, 
    name: 'Rocky Road', 
    price: 195,
    image: 'https://media.istockphoto.com/id/815934478/photo/marshmallow-chocolate-ice-cream.jpg?s=612x612&w=0&k=20&c=QNui7AxJ8qC211dlAocTvBuP_4unu_9v0nD0aU2XS1I=',
    description: 'Chocolate with marshmallows & nuts'
  },
  { 
    id: 7, 
    name: 'Pistachio', 
    price: 220,
    image: 'https://media.istockphoto.com/id/1492574002/photo/pistachio-ice-cream.jpg?s=612x612&w=0&k=20&c=qB4LXxKlVVmy8AzXmEDJxN9kDeL98jOWxxswSPNud_s=',
    description: 'Nutty and delicious pistachio'
  },
  { 
    id: 8, 
    name: 'Cookies and Cream', 
    price: 195,
    image: 'https://media.istockphoto.com/id/154245754/photo/real-gourmet-ice-cream.jpg?s=612x612&w=0&k=20&c=QN9crvD_if0d3brbqjlCeEiBK247WYLxwkp9si6txXE=',
    description: 'Creamy vanilla with cookie chunks'
  },
  { 
    id: 9, 
    name: 'Matcha', 
    price: 220,
    image: 'https://media.istockphoto.com/id/2164557195/photo/matcha-ice-cream-in-kyoto-japan.jpg?s=612x612&w=0&k=20&c=KFvfJOFWZByatWaMq0lfI-FVfb4-syQrrnqZaY43BEY=',
    description: 'Authentic Japanese green tea ice cream'
  },
  { 
    id: 10, 
    name: 'Ube', 
    price: 210,
    image: 'https://media.istockphoto.com/id/1215792360/photo/homemade-purple-japanese-ube-ice-cream.jpg?s=612x612&w=0&k=20&c=PQ-OQHsfD88huJBSv80BrcFZ2hsdcFmTgt4kdGiO-_Q=',
    description: 'Filipino purple yam flavor'
  },
];
