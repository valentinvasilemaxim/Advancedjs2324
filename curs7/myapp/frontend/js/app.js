// validare
// 
(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()
// End validare

//https://datatables.net/examples/server_side/object_data.html
$(document).ready(function ($) {
    // Adauga utilizator nou
    $('#addNewUser').click(function () {
        $('#userInserUpdateForm').trigger("reset");
        $('#userModel').html("Adauga un user nou");
        $('#user-model').modal('show');
    });
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: "http://localhost:3003/users",
        method: "GET",
        headers: { "Access-Control-Allow-Origin": "*" },
        dataType: 'json',
        contentType: 'application/json'

    }).done(function (data) {
        //console.log(data);
        $('#example').dataTable({
            "paging": true,
            "pageLength": 2,
            processing: true,
            serverSide: false,
            "data": data.data,
            "columns": [
                { data: "id" },
                { data: "nume" },
                { data: "prenume" },
                { data: "email" },
                { data: "telefon" },
                {
                    data: "datanastere",
                    render: $.fn.dataTable.render.moment('YYYY-MM-DDTHH:mm:ss.SSSSZ','YYYY-MM-DD' )
    
                },
                {
                    "data": 'actiune',
                    render: function (data, type, row, meta) {
                        if (type === 'display') {
                            let link = 'http://localhost:3003/users/' + row.id;
                            return `<a href="javascript:void(0)" class="btn btn-info view" data-id="` + row.id + `">Vezi</a>
                            <a href="javascript:void(0)" class="btn btn-primary edit" data-id="`+ row.id + `">Editeaza</a>
                            <a href="javascript:void(0)" class="btn btn-danger delete" data-id="`+ row.id + `">Sterge</a>`;
                        }

                        return data;
                    },
                },

            ]
        })
    })
    // END Adauga utilizator nou
    //   Editeaza utilizator
    $('body').on('click', '.edit', function () {
        var id = $(this).data('id');
        $('#userModel').html("Edit User");
        $('#btn-save').val("editUser");
        $('#user-model').modal('show');
        // ajax
        $.ajax({
            type: "GET",
            url: "http://localhost:3003/users/" + id,
            data: {
                id: id
            },
            dataType: 'json',
            success: function (res) {
                 console.log(res.data.id);
                
                let datan= moment(res.data.datanastere).format('YYYY-MM-DD');  
                alert(datan);
                $('#id').val(res.data.id);
                $('#lname').val(res.data.nume);
                $('#fname').val(res.data.prenume);
                $('#email').val(res.data.email);
                $('#age').val(datan);
                $('#phone').val(res.data.telefon);



            }
        });
    });
    //  END  Editeaza utilizator
    // START DELETE
    $('body').on('click', '.delete', function () {
        if (confirm("Delete Record?") == true) {
            var id = $(this).data('id');
            // ajax
            $.ajax({
                type: "DELETE",
                url: "http://localhost:3003/users/" + id,
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (res) {

                    window.location.reload();
                }
            });
        }
    });
    $('#userInserUpdateForm').submit(function () {
        // ajax
        var idValue = document.getElementById("id").value;
        var nume = document.getElementById("lname").value;
        var prenume = document.getElementById("fname").value;
        alert(idValue == '');
        console.log('am id', idValue);
        let method = 'POST';
        let urlReq = "http://localhost:3003/users/"
        if (idValue != '') {
            method = 'PUT';
            urlReq = "http://localhost:3003/users/" + idValue;
        }
        else {
            idValue
        }
        alert(method);
        alert(urlReq);
        $.ajax({

            type: method,
            url: urlReq,
            data: $(this).serialize(), // get all form field value in 
            // data:{
            //     nume:nume,
            //     prenume:prenume,
            //     id:idValue
            // },
            dataType: 'json',
            success: function (res) {
                console.log('am primit', res);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('am primit', XMLHttpRequest);
                console.log("Error: " + errorThrown + textStatus);
            },
            complete: function () {
                $('#user-model').modal('hide');
                window.location.reload();
            }
        });
    });
}); 