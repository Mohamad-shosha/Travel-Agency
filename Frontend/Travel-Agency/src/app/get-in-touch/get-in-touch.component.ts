import { Component } from '@angular/core';

@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.css']
})
export class GetInTouchComponent {
  contact = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  };

  onSubmit() {
    if (!this.contact.firstName || !this.contact.lastName || !this.contact.email) {
      alert('Please fill in all required fields.');
      return;
    }
    // هنا ممكن ترسل البيانات للسيرفر أو أي معالجة أخرى
    alert('Thank you for contacting us! We will get back to you soon.');

    // إعادة تهيئة الفورم
    this.contact = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      destination: '',
      message: ''
    };
  }
}
