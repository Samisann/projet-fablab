import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeoLocationService {
  async getAddressCoordinates(address: string) {
    const apiKey = 'abc6b88b222268f459a9954ca72aad2d';
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodedAddress}`;

    try {
      const response = await axios.get(url);
      const { data } = response;

      if (data && data.data && data.data.length > 0) {
        const { latitude, longitude } = data.data[0];
        return { latitude, longitude };
      } else {
        throw new Error('No coordinates found for the given address');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch coordinates for the address');
    }
  }
}
