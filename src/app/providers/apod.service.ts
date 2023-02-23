import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface APOD {
  readonly date: Date;
  readonly url: string;
  readonly explanation: string;
  readonly title: string;
}

enum MediaType {
  image = 'image',
  video = 'video',
}

interface APODAPIData {
  readonly date: string;
  readonly explanation: string;
  readonly hdurl: string;
  readonly media_type: 'image' | 'video';
  readonly service_version: string;
  readonly title: string;
  readonly url: string;
  readonly thumbnail_url: string;
}
interface APODParams {
  readonly date?: string;
  readonly start_date?: string;
  readonly end_date?: string;
  readonly count?: number;
  readonly thumbs?: boolean;
  readonly api_key?: string;
}

@Injectable()
export class APODService {
  constructor(private http: HttpClient) {}

  getAPOD(index: number = 0): Observable<APOD> {
    const date = this.formatDate(this.getDaysBack(new Date(), index));
    const url = 'https://api.nasa.gov/planetary/apod';

    return this.http
      .get(url, {
        params: { ...this.getParams, date },
      })
      .pipe(map(this.convertToAPODData));
  }
  // TODO : finish get images by date and navigate
  getAll(count: number = 0): Observable<APOD[]> {
    const url = 'https://api.nasa.gov/planetary/apod';

    return this.http
      .get<APODAPIData[]>(url, {
        params: { ...this.getParams, count },
      })
      .pipe(
        map((data) => {
          return data.map((pictures) => this.convertToAPODData(pictures));
        })
      );
  }

  private convertToAPODData(data: APODAPIData): APOD {
    return {
      date: new Date(data.date),
      title: data.title,
      url: data.media_type === MediaType.video ? data.thumbnail_url : data.url,
      explanation: data.explanation,
    };
  }
  private get getParams(): APODParams {
    return {
      thumbs: true,
      api_key: 'F6mgBIsLdaBfpSFnJm29xtspa9KV8dB1Q7d7iv4n',
    };
  }

  private formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  private getDaysBack(date, days = 0) {
    return date.setDate(date.getDate() - days);
  }
}
