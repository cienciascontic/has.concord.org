// initialize vars
var deferred_obj = $.Deferred();
var show_reg = true;
var body_width = $('body').width();

$(window).resize(function() {
  if (body_width < 733) {
    var reg_top = ($('#intro').height()) + 'px';
    $('#register').css({'display': 'block', 'top': reg_top});
  }
});

$(document).ready(function() {

  // show CC info on CC logo click
  $('#cc-logo').bind('click', showCC);

  // set up navigation link behaviors
  setupNavLinks();

  // start shake animations for certain page elements
  if (body_width > 959 ) {
    var shake_scroll = setInterval(periodicalScroll, 6000);
  }

  if (body_width < 733) {
    var reg_top = ($('#intro').height()) + 'px';
    $('#register').css('top', reg_top);
  }

  $('.event').each(function(index){
    var event_id = '#event' + (index + 1);
    var line1_id = event_id + '-line1';
    var line2_id = event_id + '-line2';
    var line3_id = event_id + '-line3';
    var dot_id = event_id + '-dot';
    $(event_id).hover(
      function() { $(event_id + ', ' + line1_id + ', ' + line2_id + ', ' + line3_id + ', ' + dot_id).addClass('hover'); },
      function() { $(event_id + ', ' + line1_id + ', ' + line2_id + ', ' + line3_id + ', ' + dot_id).removeClass('hover'); }
    );
  });
  
});

function showLessonDescription(li_id) {
  var li_offset = $('#' + li_id).offset();
  var section_offset = $('#lessons article').offset();
  var xpos = (li_offset.left - 73) + 'px';
  var ypos = (li_offset.top - section_offset.top - 80) + 'px';
  var description = $('#' + li_id + ' p.description').text();
  $('#lessons article').append('<div id="lesson-detail"><p>' + description + '</p></div>');
  $('#lesson-detail').css({'left': xpos, 'top': ypos}).fadeIn(400).animate({'top': '-=20'}, {duration: 400, queue: false});
}

function hideLessonDescription() {
  $('#lesson-detail').hide();
  $('#lesson-detail').remove();
}

function removeLessonDetail() {
  $('#lesson-detail').fadeOut('fast', function() {
    $(this).remove();
  });
  $('#overlay').fadeOut('slow');
}

function setupNavLinks(){
  $('#brand a:first').click(function(){
    navTo('content');
  return false;
  });
  $('#brand nav li a').each(function() {
    $(this).click(function(){
    var link_target = $(this).attr('href').replace(/^#/, '');
    navTo(link_target);
    return false;
  });
  });
}

// special scrolling behaviors
$window = $(window);
$('section[data-type="background"]').each(function(){
        var $bgobj = $(this);
        $(window).scroll(function() {
            var yPos = -(($window.scrollTop() - $bgobj.offset().top)/$bgobj.data('speed'));
            var coords = 'left '+ yPos + 'px';
            $bgobj.css({backgroundPosition: coords});
        });
});

$(window).scroll(function() {
  scrollControl();
});

function scrollControl(){
  var body_width = $('body').width();

  if (body_width > 732) {
    if ($('html body').scrollTop() >= 75) {
      shrinkHeader();
    } else if ($('html body').scrollTop() == 0) {
      expandHeader();
    }

    if ($(window).scrollTop() < $('#lessons').position().top) {
      setSelectedNavLink('');
      $('#register').fadeOut('fast');
    } else if ($(window).scrollTop() >= $('#lessons').position().top && $(window).scrollTop() < $('#interactives').position().top) {
      setSelectedNavLink('#lessons');
      if (show_reg) {
        fadeInReg('white');
      }
    } else if ($(window).scrollTop() >= $('#interactives').position().top && $(window).scrollTop() < $('#about').position().top) {
      setSelectedNavLink('#interactives');
      if (show_reg) {
        fadeInReg();
      }
    } else if ($(window).scrollTop() >= $('#about').position().top && $(window).scrollTop() < $('#partners').position().top) {
      setSelectedNavLink('#about');
      if (show_reg) {
        fadeInReg();
      }
    } else if ($(window).scrollTop() >= $('#partners').position().top && $(window).scrollTop() < $('#contact').position().top) {
      setSelectedNavLink('#partners');
      fadeInReg();
      if ($('#about-wrapper').css('margin-left') == '-960px') {
        $('#about-wrapper').animate({'margin-left': '+=960'}, 500);
      }
    } else if ($(window).scrollTop() >= $('#contact').position().top) {
      $(window).unbind('scroll', scrollControl);
      setSelectedNavLink('#contact');
      fadeInReg();
    } else {
      setSelectedNavLink('');
    }
  }
}

function fadeInReg(bg_type) {
  var bg_color = '#e16a3e';
  var fg_color = '#f9eec1';
  var h2_color = '#f9eec1';
  if (bg_type == 'white') {
    bg_color = '#ffffff';
    fg_color = '#3f3f3f';
    h2_color = '#e16a3e';
  }
  $('#classic').css({backgroundColor: bg_color, color: fg_color});
  $('#classic h2').css({color: h2_color});
  $('#register').fadeIn('fast');
}

function scrollLessons(dir) {
  var advance_amount;
  var links_left = $('#lesson-links').position().left;
  if (dir == 'right') {
    if (links_left > -902) {
      advance_amount = links_left - 304;
      $('#lessons-left').css({'opacity': 1});
    } else {
      $('#lessons-right').css({'opacity': .5});
      $('#lessons-left').css({'opacity': 1});
      advance_amount = links_left;
    }
  } else {
    if (links_left < 0) {
      advance_amount = links_left + 304;
      $('#lessons-right').css({'opacity': 1});
    } else {
      $('#lessons-left').css({'opacity': .5});
      $('#lessons-right').css({'opacity': 1});
      advance_amount = links_left;
    }
  }
  $('#lesson-links').animate({'left': advance_amount}, 450);
}

function setSelectedNavLink(section) {
  $('nav li a').each(function() {
    $(this).removeClass('current');
  });
  if (section != '') {
    var section_link = section + '-link';
    $(section_link).addClass('current');
  }
}

function showCC() {
  $('#brand').animate({backgroundColor: '#f9eec1', 'top': 340}, 700);
  //$('#overlay').css({'opacity': .5}).fadeIn(0).animate({'top': 340}, 700);
  $('#content').animate({'margin-top': '340'}, 700);
  $('#cc').animate({'top': 0}, 700);
  $('#cc-logo').unbind('click').bind('click', hideCC);
}

function hideCC() {
  $('#brand').animate({backgroundColor: '#bddfdf', 'top': 0}, 700);
  //$('#overlay').fadeOut('fast').animate({'top': 0}, 700);
  $('#content').animate({'margin-top': '0'}, 700);
  $('#cc').animate({'top': -340}, 700);
  $('#cc-logo').unbind('click').bind('click', showCC);
}

function showHidePapers() {
  if ($('#about-wrapper').css('left') == '-960px') {
    $('#about-wrapper').animate({'left': '+=960'}, 500, function() {
      $('#register').fadeIn('fast');
      show_reg = true;
    });
  } else {
    show_reg = false;
    $('#register').fadeOut('fast', function() {
      $('#about-wrapper').animate({'left': '-=960'}, 500);
    });
  }
}

function showHideTimeline() {
  if ($('#about-wrapper').css('left') == '960px') {
    $('#about-wrapper').animate({'left': '-=960'}, 500, function() {
      $('#register').fadeIn('fast');
      show_reg = true;
    });
  } else {
    show_reg = false;
    $('#register').fadeOut('fast', function() {
      $('#about-wrapper').animate({'left': '+=960'}, 500);
    });
  }
}

function navTo(elem) {
  var link_id = '#' + elem + '-link';
  if (elem == 'content') {
    $('html, body').animate({scrollTop: 0}, 500);
  } else if (elem == 'contact') {
    $('html, body').animate({scrollTop: $('#' + elem).offset().top - 50}, 500);
  } else {
    $('html, body').animate({scrollTop: $('#' + elem).offset().top - 50}, 500);
  }
}

function shrinkHeader() {
  $('#brand, #brand section').stop().animate({'height': '75px'}, 150);
  $('#mw-logo').stop().animate({'height': '65px', 'margin-top': '-32px', 'width': '165px'}, 150);
}

function expandHeader() {
  $('#brand, #brand section').stop().animate({'height': '100px'}, 150);
  $('#mw-logo').stop().animate({'height': '75px', 'margin-top': '-37px', 'width': '191px'}, 150);
}

function periodicalScroll() {
  $('#scroll').effect('shake', { direction: 'up', distance: 10, times: 3 }, 700);
}

function updateHash(hash) {
  var div_top = $(window).scrollTop() + 'px';
  var div_pos_type;
  hash = hash.replace(/^#/, '');

  if (hash != '') {

  var fx, node = $('#' + hash);
  if (node.length) {
    node.attr('id', '');
    if (navigator.appName.indexOf('Microsoft Internet Explorer') != -1) {
      div_pos_type = 'fixed';
    } else {
      div_pos_type = 'absolute';
    }
    fx = $('<div style="height: 50000px;"></div>')
            .css({
                position: div_pos_type,
                visibility: 'hidden',
                top: div_top
            })
            .attr('id', hash)
            .appendTo(document.body);
  }

  document.location.hash = hash;
  if (node.length) {
    fx.remove();
    node.attr('id', hash);
  }

  } else {
    //document.location.hash = hash;
  }
}

function changeHashNoScroll(hash) {
  var scrollmem = $('html').scrollTop();
  window.location.hash = hash;
  $('html,body').scrollTop(scrollmem); // unnecessary?
}

function toggleStandards(div_id) {
  if (jQuery(div_id).css('display') != 'block') {
    jQuery(div_id).parent().unbind('mouseenter mouseleave');
    jQuery('#lesson-detail').hide();
    jQuery(div_id).append('<a class="close-link" href="#" onclick="toggleStandards(\'' + div_id + '\'); return false;">close this</a>');
    jQuery('#overlay').fadeIn(500);
    jQuery(div_id).fadeIn(1000);
  } else {
    jQuery('#overlay').fadeOut(1000);
    jQuery(div_id).fadeOut(500);
    jQuery(div_id).parent().hover(
      function(){showLessonDescription($(this).attr('id'));}, 
      function(){hideLessonDescription();}
    );
  }
}

function showTimelineDetail(link, height, width) {
  var detail_id = $(link).attr('href');
  $('#overlay').fadeIn('slow').unbind('click').click(function(){
    hideTimelineDetail(detail_id);
  });
  $(detail_id).css({'height': height, 'width': width}).fadeIn('fast');
}

function hideTimelineDetail(detail_id) {
  $('#overlay').fadeOut('slow');
  $(detail_id).fadeOut('fast');
}