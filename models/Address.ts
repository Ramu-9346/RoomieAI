export interface Address {
  id: string;
  label: string;           // "Home", "Office", "Flat 4B"
  line1: string;
  line2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
}
