import {
  Fish,
  FishOff,
  Wifi,
  WifiOff,
  EggFried,
  EggOff,
  CircleParking,
  CircleParkingOff,
} from 'lucide-react';

export const amenities = [
  {
    key: 'wifi',
    trueLabel: 'wifi',
    falseLabel: 'no wifi',
    TrueIcon: Wifi,
    FalseIcon: WifiOff,
  },
  {
    key: 'parking',
    trueLabel: 'parking',
    falseLabel: 'no parking',
    TrueIcon: CircleParking,
    FalseIcon: CircleParkingOff,
  },
  {
    key: 'breakfast',
    trueLabel: 'breakfast',
    falseLabel: 'no breakfast',
    TrueIcon: EggFried,
    FalseIcon: EggOff,
  },
  {
    key: 'pets',
    trueLabel: 'pet friendly',
    falseLabel: 'no pets',
    TrueIcon: Fish,
    FalseIcon: FishOff,
  },
];
