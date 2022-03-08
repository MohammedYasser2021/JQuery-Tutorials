$(function () {
  'use strict'
  $('body').attr('data-col', localStorage.getItem('data-cl'))
  // calculate padding of body
  $('body').css('paddingTop', $('ul').innerHeight())

  // smoothly scroll to element
  $('ul li a').on('click', function (e) {
    // console.log($(this).data("scroll"))
    e.preventDefault()
    $('html, body').animate(
      {
        scrollTop:
          $('#' + $(this).data('scroll')).offset().top -
          $('.nav').innerHeight() +
          5,
      },
      1000,
    )

    // add active class on navbar links and remove class from his siblings
    $(this).addClass('active')

    $(this).parent().siblings().find('a').removeClass('active')
  })

  $(window).on('scroll', function () {
    // sync navbar links with sections
    $('.sec').each(function () {
      if ($(window).scrollTop() >= $(this).offset().top) {
        var secId = $(this).attr('id')
        $('ul a').removeClass('active')
        $('ul li a[data-scroll="' + secId + '"]').addClass('active')
      }
    })

    // scroll to top
    let scrollBtn = $('.scroll-to-top')
    if ($(window).scrollTop() >= 500) {
      if (scrollBtn.is(':hidden')) {
        scrollBtn.fadeIn(1000)
      }
    } else {
      scrollBtn.fadeOut(1000)
    }
  })
  $('.scroll-to-top').on('click', function (e) {
    e.preventDefault()
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      1500,
    )
  })

  // show popup

  $('.show-pop').on('click', function () {
    $($(this).data('popup')).fadeIn(1000)
  })

  $('.popup').on('click', function () {
    $(this).fadeOut(1000)
  })
  $('.popup .inner').on('click', function (e) {
    e.stopPropagation()
  })
  $('.popup .close').on('click', function (e) {
    e.preventDefault()
    $(this).parentsUntil('.popup').parent().fadeOut(1000)
  })
  $(document).keydown(function (event) {
    if (event.keyCode == 27) {
      $('.popup').fadeOut(1000)
    }
  })

  // effects on buttons
  $('.btn-effects button').each(function () {
    $(this).prepend('<span></span>')
  })
  $('.to-left, .border-left').hover(
    function () {
      $(this).find('span').eq(0).animate(
        {
          width: '100%',
        },
        500,
      )
    },
    function () {
      $(this).find('span').eq(0).animate(
        {
          width: '0',
        },
        500,
      )
    },
  )

  $('.to-top, .border-top').hover(
    function () {
      $(this).find('span').eq(0).animate(
        {
          height: '100%',
        },
        500,
      )
    },
    function () {
      $(this).find('span').eq(0).animate(
        {
          height: '0',
        },
        500,
      )
    },
  )

  // animated progress

  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= $('#about').offset().top) {
      $('.animated-progress span').each(function () {
        $(this).animate(
          {
            width: $(this).data('progress') + '%',
          },
          5000,
          function () {
            $(this)
              .text($(this).attr('data-progress') + '%')
              .css('paddingRight', ' 5px')
          },
        )
      })
    }
  })

  // fixed menu
  $('.fixed-menu i').on('click', function () {
    let fixedMenu = $(this).parent('.fixed-menu')
    let leftFixed = fixedMenu.innerWidth() * -1 + 'px'
    fixedMenu.toggleClass('is-visible')

    if (fixedMenu.hasClass('is-visible')) {
      fixedMenu.animate(
        {
          left: 0,
        },
        500,
      )

      $('body').animate(
        {
          paddingLeft: fixedMenu.innerWidth(),
        },
        500,
      )
    } else {
      fixedMenu.animate(
        {
          left: leftFixed,
        },
        500,
      )

      $('body').animate(
        {
          paddingLeft: 0,
        },
        500,
      )
    }
  })

  $('.change-colors li').on('click', function () {
    $('body').attr('data-col', $(this).data('color'))

    localStorage.setItem('data-cl', $(this).data('color'))
  })

  /* gallery */

  let thumbnails_number = $('.thumbnails img').length
  let margin_between_thumbnails = 0.5
  let imgWidth =
    (100 - (thumbnails_number - 1) * margin_between_thumbnails) /
    thumbnails_number
  $('.thumbnails img').css({
    width: imgWidth + '%',
  })
  $('.thumbnails img:not(:last-child)').css({
    marginRight: margin_between_thumbnails + '%',
  })

  $('.thumbnails img').on('click', function () {
    $(this).addClass('selected')
    $(this).siblings().removeClass('selected')

    $('.master-img img').hide().attr('src', $(this).attr('src')).fadeIn(500)
  })

  $('.master-img i').on('click', function () {
    if ($(this).hasClass('fa-chevron-right')) {
      if ($('.thumbnails img.selected').is(':last-child')) {
        $('.thumbnails img:first-child').click()
      } else {
        $('.thumbnails img.selected').next().click()
      }
    } else if ($(this).hasClass('fa-chevron-left')) {
      if ($('.thumbnails img.selected').is(':first-child')) {
        $('.thumbnails img:last-child').click()
      } else {
        $('.thumbnails img.selected').prev().click()
      }
    }
  })
  /* toggle product decription */
  $('.products .product i').on('click', function () {
    //    if($(this).hasClass("fa fa-plus fa-lg")){
    //      $(this).removeClass("fa fa-plus fa-lg").addClass("fa fa-minus fa-lg");
    //    }else if($(this).hasClass("fa fa-minus fa-lg")){
    //     $(this).removeClass("fa fa-minus fa-lg").addClass("fa fa-plus fa-lg");
    //    }

    // anorther solution
    $(this).toggleClass('fa-plus fa-minus')
    $(this).next('p').slideToggle()
  })

  // switch list and grid view
  $('.view-options i').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active')
    $('.items').removeClass('list-view grid-view')
    $('.items').addClass($(this).data('class'))
  })

  // error message
  $('.error-message').each(function () {
    $(this)
      .animate(
        {
          right: 0,
        },
        1000,
      )
      .delay(2000)
      .animate(
        {
          right: '-100%',
        },
        1000,
      )
  })
  $('.success-message').each(function () {
    $(this).slideDown(500).delay(2000).slideUp(500)
  })

  /* our form practice */
  /* hide placeholder on focus and show on blur */
  let placeAttr = ''
  $('[placeholder]')
    .on('focus', function () {
      placeAttr = $(this).attr('placeholder')
      $(this).attr('placeholder', '')
    })
    .blur(function () {
      $(this).attr('placeholder', placeAttr)
    })

  /*  show message on empty input */
  $('[required]')
    .on('blur', function () {
      if ($(this).val() === '') {
        $(this).parent().find('.the_message').fadeIn(500)
        $(this).css('border', '1px solid red')
      }
    })
    .on('keyup', function () {
      $(this).parent().find('.the_message').fadeOut(500)
      $(this).css('border', 'none')
    })

  /* add asterisk to required inputs */
  $("<span class='asterisk'>*</span>").insertBefore(':input[required]')

  // customize the asterisk with jquery
  $('.asterisk').parent('div').css('position', 'relative')
  $('.asterisk').each(function () {
    $('.asterisk').css({
      position: 'absolute',
      top: '10px',
      left: $(this).parent('div').find('input').innerWidth() - 20,
      color: '#f00',
    })
  })

  // customize the input file
  $("form input[type = 'file']").wrap('<div class="custom-file"></div>')
  $('.custom-file').prepend('<span>Upload Your File</span>')
  $('.custom-file').append("<i class = 'fa fa-upload skin-color'></i>")
  $("form input[type = 'file']").change(function () {
    $('form .custom-file span').text($(this).val().slice(12))
  })

  // detect unicode of keyboard keys
  $('.detect-unicode').on('keyup', function (e) {
    let keyboardKey = e.keyCode || e.which
    $('.unicode').html(keyboardKey)
  })

  // change input direction depend on the language

  $('.auto-direction').on('keyup', function () {
    if ($(this).val().charCodeAt(0) < 200) {
      $(this).css({
        direction: 'ltr',
      })
    } else {
      $(this).css({
        direction: 'rtl',
      })

      $(this).attr('placeholder', $(this).attr('data-place'))
    }
  })

  $('.auto-direction').on('blur', function () {
    $(this).css('direction', 'ltr')
  })

  // convert input to tags
  $('.add-tag').on('keyup', function (e) {
    let keyboardKey = e.keyCode || e.which
    var inpVal = $(this)
      .val()
      .slice(0, $(this).val().length - 1)
    if (keyboardKey === 188 && !$('.tags').hasClass(inpVal)) {
      // you pressed on comma now
      $('.tags').append(
        `<span class='tag-span'><i class="fa fa-times"></i>${inpVal}</span>`,
      )
      $('.tags').addClass(inpVal)
      $(this).val('')
    } else if (keyboardKey === 188 && $('.tags').hasClass(inpVal)) {
      $(this).val('this is value is already exist')
    }
  })

  // remove tag on click
  $('.tags').on('click', '.tag-span i', function () {
    $(this).parent('.tag-span').fadeOut(500)
  })

  // trim text characters in paragraph

  function trimText(selector, maxLength) {
    $(selector).each(function () {
      var allText = $(this).text()
      if ($(this).text().length > maxLength) {
        var trimmedText = $(this).text().substr(0, maxLength)
        $(this).html(trimmedText + "<button class='read'>Read More</button>")
      }
      $(selector).on('click', '.read', function () {
        $(this)
          .parent()
          .html(allText + "<button class='less'>Less</button>")
        $('.less').on('click', function () {
          $(selector).html(
            trimmedText + "<button class='read'>Read More</button>",
          )
        })
      })
    })
  }

  trimText('.trimmed-text p.one', 100)
  trimText('.trimmed-text p.two', 150)
  trimText('.trimmed-text p.three', 200)

  /* bounce effect */
  function bounceElements(selector, times, distance, speed) {
    for (let i = 0; i < times; i++) {
      $(selector).on('click', function () {
        $(this)
          .animate(
            {
              top: '-=' + distance,
            },
            speed,
          )
          .animate(
            {
              top: '+=' + distance,
            },
            speed,
          )
      })
    }
  }

  bounceElements('.bounce-one', 3, '20px', 500)
  bounceElements('.bounce-two', 2, '25px', 500)

  /* adjust the elements to the same height */
  let theMaxHeight = 0
  $('.paragraphs p').each(function () {
    if ($(this).height() > theMaxHeight) {
      theMaxHeight = $(this).height()
    }
  })
  console.log(theMaxHeight)
  $('.paragraphs p').height(theMaxHeight)

  // shuffle cards

  var zIndexVal = 0
  $('.cards .card').on('click', function () {
    $(this)
      .animate(
        {
          left: '20%',

          marginTop: '30px',
        },
        400,
        function () {
          zIndexVal--

          $(this).css('z-index', zIndexVal)
        },
      )
      .animate(
        {
          left: $(this).css('left'),

          marginTop: 0,
        },
        400,
      )
  })
  blinkWarning()
  // create blink error
  function blinkWarning() {
    $('.blink-warning').fadeOut(1000, function () {
      $(this).fadeIn(1000)

      blinkWarning()
    })
  }

  // todo list

  let newTask = $('.task-input')

  $('.todo-add-task').on('submit', function (e) {
    e.preventDefault()

    if (newTask.val() !== '') {
      $(
        `<li>${newTask.val()}<span class="task-delete">delete</span><span class="task-comp">Complete</span></li>`,
      ).prependTo('.todo-tasks')
    }
    newTask.val('')
  })

  $('.todo-tasks').on('click', '.task-delete', function () {
    $(this).parent().removeClass('complete')
    $(this).parent().removeClass('load')
    $(this).parent().addClass('del')
    $(this).parent().fadeOut(500)
    statsDelete()
    statsComplete()
    statsLoading()
  })
  $('.todo-tasks').on('click', '.task-comp', function () {
    $(this).parent().removeClass('del load')
    $(this).parent().addClass('complete')
    $(this).parent().find('.loading').fadeOut()
    $(`<span class="done"><i class="fa fa-check-square"></i></span>`).prependTo(
      $(this).parent(),
    )
    statsComplete()
    statsLoading()
  })
  $('.todo-tasks').on('dblclick', '.task-comp', function () {
    $(this).parent().removeClass('complete del')
    $(this).parent().addClass('load')
    $(this).parent().find('.done').fadeOut()
    $(`<span class="loading"><i class="fa fa-spinner"></i></span>`).prependTo(
      $(this).parent(),
    )

    statsComplete()
    statsLoading()
  })

  function statsDelete() {
    $('.tasks-num span').text($('.del').length)
  }
  function statsComplete() {
    $('.tasks-completed span').text($('.complete').length)
  }
  function statsLoading() {
    $('.tasks-loading span').text($('.load').length)
  }

  // type write effect

  let theText = $('.typer').attr('data-text'),
    theTextLength = theText.length,
    n = 0,
    theTyper = setInterval(function () {
      $('.typer').each(function () {
        $(this).html($(this).html() + theText[n])
      })
      n++
      if (n === theTextLength) {
        clearInterval(theTyper)
      }
    }, 100)

  // calculate table cells values

  let theSummary = 0

  $('.price').each(function () {
    theSummary += +$(this).text()
  })
  $('.theTotal').text(theSummary)

  /* auto change content */
  ;(function autoChange() {
    $('.ticker-list .active').each(function () {
      if (!$(this).is(':last-child')) {
        $(this)
          .delay(1000)
          .fadeOut(1000, function () {
            $(this).removeClass('active').next().addClass('active').fadeIn(1000)
            autoChange()
          })
      } else if ($(this).is(':last-child')) {
        $(this)
          .delay(1000)
          .fadeOut(1000, function () {
            $(this).removeClass('active')

            $('.ticker-list li').eq(0).addClass('active').fadeIn(1000)
            autoChange()
          })
      }
    })
  })()

  // dynamic tabs

  $('.dynamic-tabs ul li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active')
    $('.content-list > div').hide()
    $($(this).data('content')).fadeIn(1000)
  })

  $('.switch-tabs').on('click', function () {
    $('.dynamic-tabs').toggleClass('left-tabs')
  })

  // email suggest box

  let emailProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
  let finalString = ''

  $('.email-suggest').on('keyup', function () {
    finalString = ''

    if (!$(this).next().is('.suggest-box')) {
      $("<ul class='suggest-box'></ul>").insertAfter($(this))
    }
    let charIndex = $(this).val().indexOf('@')
    let slString = $(this).val().slice(0, charIndex)

    for (let emailProvider of emailProviders) {
      if (!$(this).val().includes('@')) {
        finalString += `<li>${$(this).val()}@${emailProvider}</li>`
      } else {
        finalString += `<li>${slString}@${emailProvider}</li>`
      }
    }
    $('.suggest-box').html(finalString)
  })

  $('body').on('click', '.suggest-box li', function () {
    $('.email-suggest').val($(this).text())

    $(this)
      .parent()
      .fadeOut(1000, function () {
        $(this).remove()
      })
  })
})
