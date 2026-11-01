import Loader from './loader';
import { LoaderOptions } from '../../types/interfaces';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL ?? '';
        const apiKey = process.env.API_KEY ?? '';
        const options: LoaderOptions = { apiKey };
        super(apiUrl, options);
    }
}

export default AppLoader;
