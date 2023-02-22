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
export interface APODParams {
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

  getAPOD(count: number = 0): Observable<APOD> {
    let date = this.formatDate(this.getDaysBack(new Date(), count));
    const url = 'https://api.nasa.gov/planetary/apod';

    return this.http
      .get(url, {
        params: { ...this.getParams, date },
      })
      .pipe(map(this.convertToAPODData));
  }

  getAll(count: number = 0): Observable<APOD[]> {
    const url = 'https://api.nasa.gov/planetary/apod';

    return this.http
      .get<APOD[]>(url, {
        params: { ...this.getParams, count },
      })
      .pipe(
        map((data) => {
          return data.map((pictures) => this.convertToAPODData(pictures));
        })
      );
  }

  private convertToAPODData(data: APOD): APOD {
    return {
      date: data['date'],
      title: data['title'],
      url: data['media_type'] === 'video' ? data['thumbnail_url'] : data['url'],
      explanation: data['explanation'],
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
