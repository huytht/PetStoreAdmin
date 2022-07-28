import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'delete-modal',
  templateUrl: './delete.modal.html',
  styleUrls: ['../base/base.modal.css']
})
export class DeleteModal {

  constructor(public dialogRef: MatDialogRef<DeleteModal>, @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService) { }

  confirmDelete() {
    // switch (this.data.type) {
    //   case 'track':
    //     this.removeTrack();
    //     break;

    //   case 'album':
    //     this.deleteAlbum();
    //     break;

    //   case 'playlist':
    //     this.deletePlaylist();
    //     break;

    //   case 'track-from-playlist':
    //     this.removeTrackFormPlaylist();
    //     break;
    // }
  }

  // removeTrack() {
  //   this.trackService.removeTrack(this.data.trackId).subscribe(
  //     (response: any) => {
  //       this.toastr.success('Xóa bài hát thành công');
  //       this.dialogRef.close();
  //     }, (error) => {
  //       this.toastr.error(error.error.errorMessage);
  //     }
  //   );
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }
}