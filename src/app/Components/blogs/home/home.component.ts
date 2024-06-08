import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  blogs_list: any = [];
  user: any = ''
  comments: any = [];
  slug: any = ''
  body: any = '';
  base64Image: any;
  file!: File | any;
  uploadVideo: boolean = false;
  constructor(private blogs: AppService, private authentication: AuthService, private toastr: ToastrService,) {

  }
  select(event: any) {
    this.uploadVideo = false
    this.file = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.base64Image = reader.result;
      console.log(this.base64Image);
      console.log(this.file);
    };
  };
  selectVideo(event: any) {
    this.uploadVideo = true
    this.file = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.base64Image = reader.result;
      console.log(this.base64Image);
      console.log(this.file);


    };
  };
  ngOnInit(): void {


    this.user = this.authentication.currentUserValue
    Aos.init();
    this.getblogs()
  }
  getblogs() {
    this.blogs.showBlogs().subscribe((res: any) => {
      console.log(res);
      this.blogs_list = res
      const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'webm'];

      this.blogs_list.map((blog: any) => {
        return blog.video = false
        // const extension = blog.media_file.split('.').pop().toLowerCase();
      })
      this.blogs_list.map((blog: any) => {
        // return blog.video=false
        if (blog.media_file) {
          const extension = blog.media_file.split('.').pop().toLowerCase();
          if (videoExtensions.includes(extension)) {
            return blog.video = true;
          }
        }

      })
      console.log(this.blogs_list);


      this.loading = false
    })

  }
  // like(item: any) {
  //   let form = {
  //     profile: this.user.profile_id,
  //     blog_post: item.id
  //   }
  //   this.blogs.like(form).subscribe((res: any) => {

  //     if (res.msg) {
  //       this.toastr.info('', res.msg, {
  //         closeButton: true,
  //         tapToDismiss: true,
  //         disableTimeOut: false,
  //         timeOut: 3000
  //       });
  //       item.likes = parseInt(item.likes) - 1;
  //     } else {
  //       this.toastr.info('', 'add like to post', {
  //         closeButton: true,
  //         tapToDismiss: true,
  //         disableTimeOut: false,
  //         timeOut: 3000
  //       });
  //       item.likes = parseInt(item.likes) + 1;
  //     }



  //   })
  // }
  // dislike(item: any) {
  //   let form = {
  //     profile: this.user.profile_id,
  //     blog_post: item.id
  //   }
  //   this.blogs.dislike(form).subscribe((res: any) => {
  //     console.log(res);
  //     if (res.msg) {
  //       this.toastr.info('', res.msg, {
  //         closeButton: true,
  //         tapToDismiss: true,
  //         disableTimeOut: false,
  //         timeOut: 3000
  //       });
  //       item.dislikes = parseInt(item.dislikes) - 1
  //     } else {
  //       this.toastr.info('', 'add dislike to post', {
  //         closeButton: true,
  //         tapToDismiss: true,
  //         disableTimeOut: false,
  //         timeOut: 3000
  //       });
  //       item.dislikes = parseInt(item.dislikes) + 1
  //     }
  //   })
  // }
  getComments(item: any) {
    this.comments = []
    this.slug = item.slug
    this.blogs.comments(item.slug).subscribe((res: any) => {
      console.log(res);
      this.comments = res
    })
  }
  addComment(item: any) {
    let form = {
      profile: this.user.profile_id,
      blog_post: item.id,
      body: this.body
    }
    this.blogs.addComments(item.slug, form).subscribe((res: any) => {
      console.log(res);
      if (res.message) {
        this.toastr.error('', res.message, {
          closeButton: true,
          tapToDismiss: true,
          disableTimeOut: false,
          timeOut: 3000
        });

      } else {
        this.toastr.info('', 'add comment to post', {
          closeButton: true,
          tapToDismiss: true,
          disableTimeOut: false,
          timeOut: 3000
        });
      }
      this.blogs.comments(item.slug).subscribe((res: any) => {
        console.log(res);
        this.comments = res
      })
      this.body = ''
    })
  }
  addPost() {

    let form = {
      doctor: this.user.doctor_id,
      body: this.body,
      media_file: this.file ? this.file : '',
      category_id: 3

    }
    this.blogs.addpost(form).subscribe((res: any) => {
      console.log(res);
      this.toastr.info('', 'The Post Is added successfully', {
        closeButton: true,
        tapToDismiss: true,
        disableTimeOut: false,
        timeOut: 3000
      });
      this.body = '';
      this.file = '';
      this.base64Image = ''
      this.getblogs()
    })
  }
}
