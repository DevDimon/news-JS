import { RequestMethod, Endpoints } from '../../types/enums';
import { LoaderOptions, RequestParams } from '../../types/interfaces';

class Loader {
    protected baseLink: string;
    protected options: Readonly<LoaderOptions>;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(RequestMethod.GET, endpoint, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<LoaderOptions>, endpoint: string): string {
        const urlOptions: LoaderOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private async load<T>(
        method: RequestMethod,
        endpoint: string,
        options: Partial<LoaderOptions> = {}
    ): Promise<T> {
        const response = await fetch(this.makeUrl(options, endpoint), { method });
        const handled = this.errorHandler(response);
        const data = (await handled.json()) as T;
        return data;
    }
}

export default Loader;
