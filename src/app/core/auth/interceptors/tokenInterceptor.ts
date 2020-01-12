import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private toastGeneratorService: ToastGeneratorService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken() || '';
        const socketId = this.authService.getSocketId() || '';

        request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`).set('socketId', socketId)
        });
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && (event.status === 504 || event.status === 0)) {
                    this.toastGeneratorService.presentToast('Błąd podczas autoryzacji', 'danger');
                    this.authService.signOut();
                }
            }, error => {
                if (error.status === 0 || error.status === 500) {
                    this.toastGeneratorService.presentToast('Błąd podczas łączenia z serwerem, sprawdź połączenie z internetem', 'danger');

                }
            })
        );
    }
}
