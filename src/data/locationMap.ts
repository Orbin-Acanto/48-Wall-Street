export type MapCategoryId = 'venue' | 'subway' | 'bus' | 'hotel' | 'parking';

export interface MapPoint {
  name: string;
  lat: number;
  lng: number;
}

export interface MapCategory {
  id: Exclude<MapCategoryId, 'venue'>;
  label: string;
  color: string;
  points: MapPoint[];
}

export const VENUE: MapPoint = { name: '48 Wall St', lat: 40.706485, lng: -74.009174 };

export const VENUE_COLOR = '#b8860b';

export const MAP_CATEGORIES: MapCategory[] = [
  {
    id: 'subway',
    label: 'Subway',
    color: '#2563eb',
    points: [
      { name: 'Wall St', lat: 40.70639, lng: -74.009491 },
      { name: 'Broad St', lat: 40.706324, lng: -74.011221 },
      { name: 'Wall St', lat: 40.707664, lng: -74.011818 },
      { name: 'Water St & Wall St', lat: 40.705307, lng: -74.007069 },
      { name: 'Fulton St', lat: 40.709805, lng: -74.008156 },
      { name: 'Fulton St', lat: 40.709385, lng: -74.006599 },
      { name: 'Fulton St', lat: 40.710246, lng: -74.007737 },
      { name: 'Fulton St', lat: 40.710648, lng: -74.009296 },
      { name: 'Bowling Green', lat: 40.704517, lng: -74.014267 },
      { name: 'Water St/Gouverneur Ln', lat: 40.704543, lng: -74.008523 },
      { name: 'Water St & 7 Hanover Sq', lat: 40.70388, lng: -74.00943 },
      { name: 'Water St & Pine St', lat: 40.705767, lng: -74.006744 },
      { name: 'Water St/Maiden Ln', lat: 40.706097, lng: -74.006298 },
      { name: 'Broadway at Exchange Pl', lat: 40.706589, lng: -74.012749 },
      { name: 'Trinity Pl/Thames St', lat: 40.708344, lng: -74.012474 },
      { name: 'Rector St', lat: 40.707776, lng: -74.012963 },
    ],
  },
  {
    id: 'bus',
    label: 'Bus',
    color: '#059669',
    points: [
      { name: 'Pearl St/Fulton St', lat: 40.707626, lng: -74.003716 },
      { name: 'Broadway/Exchange Alley', lat: 40.707115, lng: -74.012306 },
      { name: 'Broadway & Morris St', lat: 40.70532, lng: -74.01386 },
      { name: 'State St & Whitehall St (WB)', lat: 40.702432, lng: -74.013536 },
      { name: 'State St & Whitehall St', lat: 40.702301, lng: -74.013131 },
      { name: 'South St/Whitehall St', lat: 40.701571, lng: -74.012426 },
      { name: 'Broadway & Wall St', lat: 40.707817, lng: -74.011746 },
      { name: 'Park Row/Ann St', lat: 40.711517, lng: -74.007233 },
      { name: 'Trinity Pl/Thames St', lat: 40.70831, lng: -74.01255 },
      { name: 'South End Av/Albany St', lat: 40.710709, lng: -74.016009 },
    ],
  },
  {
    id: 'hotel',
    label: 'Hotels',
    color: '#7c3aed',
    points: [
      { name: 'The Wall Street Hotel', lat: 40.705571, lng: -74.007662 },
      { name: 'One Dutch Hotel', lat: 40.709393, lng: -74.007809 },
      { name: 'The FIDI Hotel', lat: 40.704145, lng: -74.012247 },
      { name: 'DoubleTree by Hilton New York Downtown', lat: 40.703921, lng: -74.012354 },
      { name: 'Hilton Garden Inn NYC Financial Center/Manhattan Downtown', lat: 40.702961, lng: -74.012281 },
      { name: 'Tribeca Hotel FiDi', lat: 40.708444, lng: -74.01366 },
      { name: 'The Washington Hotel NYC', lat: 40.709331, lng: -74.013761 },
      { name: 'New York Marriott Downtown', lat: 40.709521, lng: -74.014486 },
      { name: 'Mint House at 70 Pine  NYC', lat: 40.706505, lng: -74.007772 },
      { name: 'Hotel Indigo - NYC Downtown - Wall Street, an IHG Hotel', lat: 40.705493, lng: -74.007252 },
      { name: 'Hyatt Centric Wall Street New York', lat: 40.705169, lng: -74.008024 },
    ],
  },
  {
    id: 'parking',
    label: 'Parking',
    color: '#ea580c',
    points: [
      { name: 'Icon Parking', lat: 40.705296, lng: -74.010326 },
      { name: 'NYC Parking 75 Wall Garage Corp.', lat: 40.704761, lng: -74.008552 },
      { name: 'Edison ParkFast', lat: 40.706055, lng: -74.004759 },
      { name: 'Icon Parking', lat: 40.70463, lng: -74.010779 },
      { name: 'LAZ Parking - Battery Parking Garage', lat: 40.707186, lng: -74.014133 },
      { name: 'NYC Parking 100 ML Garage Corp.', lat: 40.706765, lng: -74.00753 },
      { name: 'MP Parking', lat: 40.704628, lng: -74.007473 },
      { name: 'NYC Parking 80 John Garage Corp.', lat: 40.708008, lng: -74.00695 },
      { name: '201 Pearl Parking Corp.', lat: 40.707031, lng: -74.006587 },
    ],
  },
];
