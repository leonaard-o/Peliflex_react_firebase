import Swal from "sweetalert2";

const showAlert = (type, title, text) => {
    Swal.fire({
        icon: type,
        title: title,
        text: text,
        confirmButtonText: 'OK',
        timer: 4000,
        showCloseButton: true

    })
}
export default showAlert