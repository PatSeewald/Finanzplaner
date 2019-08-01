
/**
 * Sendet einen Request an den Server und übergibt dabei das gescannte bzw. hochgeladene Image-File
 * @param {*} file 
 */
function sendToServer(file) {
  // FIX Jquery gzip  
  //  alert(viewModel.url)
  $.ajax({
    url: viewModel.url,
    method: viewModel.method,
    data: {
      file: file,
      name: 'test'
    },
    dataType: 'json',
    success: (response) => {
      alert('Response: ', response)
    }
  });
  alert(serverImg)
}

/**
 * Löscht das Vorschaubild (Thumbnail) und ermöglich ein erneutes Scannen
 */
function deletePhoto() {
  $('#smallImage')
  .attr({
    src: ''
  })
  
  $('#smallImageContainer').toggleClass('invisible');
}

// Wait for PhoneGap to connect with the device
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready to be used!
function onDeviceReady() {
  pictureSource = navigator.camera.PictureSourceType;
  destinationType = navigator.camera.DestinationType;
}


/**
 * Wird bei erfolgreichem Scannen eines Bildes aufgerufen => Speichert das aktuelle Bild in die Session und zeigt dieses als Thumbnail an
 * @param {*} imageData 
 */
function onPhotoDataSuccess(imageData) {
  showThumbnail("data:image/jpeg;base64," + imageData);
  sessionStorage.setItem('actualImage', imageData)

  // sendToServer(imageData);
}

/**
 * Wird bei erfolgreichem Hochladen eines Bildes aufgerufen => Speichert das aktuelle Bild in die Session und zeigt dieses als Thumbnail an
 * @param {*} imageData 
 */
function onPhotoFileSuccess(imageData) {
  // Get image handle  
  JSON.stringify(imageData)

  // Get image handle  
  var smallImage = document.getElementById('smallImage');

  // Unhide image elements  
  smallImage.style.display = 'block';

  // Show the captured photo    
  smallImage.src = imageData;
}

// Called when a photo is successfully retrieved

function onPhotoURISuccess(imageURI) {
  showThumbnail(imageURI);
}

function showThumbnail(imageURI) {
  $('#smallImage')
    .attr({
      src: imageURI
    })
    
    $('#smallImageContainer').toggleClass('invisible');
}

// A button will call this function
//
function capturePhotoWithData() {
  // Take picture using device camera and retrieve image as base64-encoded string

  navigator.camera.getPicture(
    onPhotoDataSuccess,
    onFail,
    {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL, 
      correctOrientation: true
    }
  );
}

function capturePhotoWithFile() {

  navigator.camera.getPicture(
    onPhotoFileSuccess,
    onFail,
    {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,      
    }
  );

}

// A button will call this function
//
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, {
    quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source
  });
}

// Called if something bad happens.
// 
function onFail(message) {
  // alert('Failed because: ' + message);
}

function getCat() {
  xhr.open('GET', 'http://84.16.242.168:8287/finance/languages', true);

  xhr.send();
}

