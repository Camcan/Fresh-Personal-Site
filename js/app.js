$(window).load(function() {
  $("#page-overlay").delay(800).fadeOut("slow")
})
$(document).ready(function(){
  

  var title = "//> Campbell_Hawkess" 
  var i = 0
  var isTag = true
  var text = ""

  function typeText(elementId, string, start, callback) {
    if (string) {

      console.log("Run: " + start)
      var text = string.slice(0, ++start)

      document.getElementById(elementId).innerHTML = "<h2>" + text + "</h2>"
      
      if (text === string) return 
      
      var char = string.slice(-1)
      
      if( char === text.slice(-1)) {
        isTag = false
      }
      if (isTag === false) {
        console.log("FALSY")
        return callback()
      }

      setTimeout(typeText, 140, elementId, string, start, callback)
    }
  }

  var showAll = function(){
      $('#return').show()
      $('#content').fadeIn()
  }

  typeText('typed-title', title, 0,
   showAll
  )

  for(var key in sections){
    loadSection(sections[key])
  }

  var sections = {
    RoR: {
      display: false,
      name: 'RoR-portfolio',
      items: [
        [],
        [],
        []
      ],
      details: {},
    },
    js: {
      display: false,
      name: 'js-portfolio',
      items: [
        {
          id: 'first-photo',
          background: "image "

        },
        {
          id: 'second-photo',
          // background: 
        },
        
      ],
      details: {},
    }
  }

  var addNewClass = function(elementId, newClass) {
    $('#'+elementId).addClass(newClass)
  }

 
  var loadTemplate = function(template, details) {
    $.get((template.name + '.html'), function(temp) {
      var htmlString = Mustache.render(temp, details)
      $('#'+ template.name).html(htmlString)
    })
  }

  var loadSection = function(section){
    loadTemplate(section.name, section.xtra)
    for (i in section.items) {
      var item = item[i] 
      getTemplateString("item", item.content)
    }
  }
  
  var toDisplay = {
    RoR: false,
    js: false
  }

  var sectionToggle = function(sections){
    for (key in sections) {
      console.log(sections[key].name)
      if (sections[key].display === false){
        $('#' + sections[key].name).fadeOut()
      } else {
        $('#' + sections[key].name).fadeIn()
      }
    }
  }

  $('#portfolio-link')
    .click(function(){
      toDisplay = {
        RoR: true,
        js: true
      }
      sectionToggle(toDisplay)
    })
  $('#nodejs-link').on('click', function(){
      var display = sections.js.display
      if (display === true) {
        display = false
      } else {
        display = true
      }
      sections.js.display = display
      console.log(sections.js.display)
      sections.RoR.display = false
      sectionToggle(sections)
    })
  $('#RoR-link')
    .on('click', function(){
      console.log("RoR Clicked")
      var display = sections.RoR.display
      console.log(display)
      if (display === true) {
        display = false
      } else {
        display = true
      }
      console.log(display)
      sections.RoR.display = display 
      sections.js.display = false
      sectionToggle(sections)
    })




//==================================================

  $('#blerb')
    .mousemove(function(e){
      var moveX = (-(e.pageX)/ 80)
      $(this).css('background-position', moveX + 'px')
    })
  $('#contact-btn')
    .click(function(event){
      event.preventDefault()
      $('html, body').animate({
        scrollTop: $('#contact').offset().top
      }, 2000);
    })
  $('#CV-btn')
    .click(function(event){
      event.preventDefault()
      $('#CV-lightbox').css('visibility', 'visible')
      $('#page-overlay').css('background', 'rgba(0,0,0,0.8)').fadeIn('slow')
      $(document)
        .mouseup(function (e){
          var lightbox = $('#CV-lightbox iframe'); 
          if (!lightbox.is(e.target)) {
            $('#page-overlay').fadeOut('slow');
          }
        })
    })  
});




