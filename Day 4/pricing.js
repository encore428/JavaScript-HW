(function initPricing() {
  fetch('api/pricing')
    .then((res) => res.json())
    .then((prices) => {
      // the function wipes out innerHTML of div where id=priceList,
      // and rebuilds the content from scratch, using the list
      // of tiers fetched from api/pricing
      const priceList = document.querySelector('#priceList');
      priceList.innerHTML = '';
      prices.forEach((p) => {
        const item = document.createElement('div');
        item.className =
          'border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200';
        {
          const div1 = document.createElement('div');
          div1.className = 'p-6';
          {
            let elem_h2 = document.createElement('h2');
            elem_h2.className = 'text-lg leading-6 font-medium text-gray-900';
            elem_h2.innerHTML = `${p.tier}`;
            div1.appendChild(elem_h2);
          }
          {
            let elem_p = document.createElement('p');
            elem_p.className = 'mt-4 text-sm text-gray-500';
            elem_p.innerHTML = 'All the basics for starting a new business';
            div1.appendChild(elem_p);
          }
          {
            let elem_p = document.createElement('p');
            elem_p.className = 'mt-8';
            {
              // Both monthly and annual prices are loaded and rendered hidden to the page,
              // and assigned either of two classes: pricemth and priceyly.
              // The hidden class is then toggled by the Monthly billing and Yearly billing
              // buttons to be selectively revealed.
              let elem_span = document.createElement('span');
              elem_span.className =
                'text-4xl font-extrabold text-gray-900 pricemth';
              elem_span.innerHTML = `$<span>${p.monthlyPrice}</span>`;
              elem_p.appendChild(elem_span);
              elem_span = document.createElement('span');
              elem_span.className =
                'text-4xl font-extrabold text-gray-900 hidden priceyly';
              elem_span.innerHTML = `$<span">${p.annualPrice}</span>`;
              elem_p.appendChild(elem_span);
              elem_span = document.createElement('span');
              elem_span.className =
                'price-unit text-base font-medium text-gray-500 pricemth';
              elem_span.innerHTML = ' /mo';
              elem_p.appendChild(elem_span);
              elem_span = document.createElement('span');
              elem_span.className =
                'price-unit text-base font-medium text-gray-500 hidden priceyly';
              elem_span.innerHTML = ' /yr';
              elem_p.appendChild(elem_span);
            }
            div1.appendChild(elem_p);
          }
          {
            let elem_a = document.createElement('a');
            elem_a.href = '#';
            elem_a.className =
              'mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900';
            elem_a.innerHTML = `Buy ${p.tier}`;
            div1.appendChild(elem_a);
          }
          item.appendChild(div1);
          {
            const div2 = document.createElement('div');
            div2.className = 'pt-6 pb-8 px-6';
            {
              let elem_h3 = document.createElement('h3');
              elem_h3.className =
                'text-xs font-medium text-gray-900 tracking-wide uppercase';
              elem_h3.innerHTML = "What's included";
              div2.appendChild(elem_h3);
            }
            {
              // The following JSON should preferrably be obtained from api, and fetched together with
              // api/pricing. As such is not made available, it is hardcoded here as if fetched.
              // This list is used to build the WHATS'S INCLUDED for each tier
              const jsonData = `
              [{"item": "Potenti felis, in cras at at ligula nunc.", "tiers": ["all"] },
               {"item": "Orci neque eget pellentesque.", "tiers": ["all"] },
               {"item": "Donec mauris sit in eu tincidunt etiam.", "tiers": ["freelancer", "startup", "enterprise"] },
               {"item": "Faucibus volutpat magna.", "tiers": ["startup", "enterprise"] },
               {"item": "Id sed tellus in varius quisque.", "tiers": ["enterprise"] },
               {"item": "Risus egestas faucibus.", "tiers": ["enterprise"] },
               {"item": "Risus cursus ullamcorper..", "tiers": ["enterprise"] }]`;
              const whatsIncluded = JSON.parse(jsonData);

              let elem_ul = document.createElement('ul');
              elem_ul.className = 'mt-6 space-y-4';

              whatsIncluded.forEach((i) => {
                let found = false;
                i.tiers.forEach((j) => {
                  found = found || j === 'all' || j === p.tier;
                });
                if (found) {
                  let elem_li = document.createElement('li');
                  elem_li.className = 'flex space-x-3';
                  {
                    let iconSvg = document.createElementNS(
                      'http://www.w3.org/2000/svg',
                      'svg'
                    );
                    let iconPath = document.createElementNS(
                      'http://www.w3.org/2000/svg',
                      'path'
                    );
                    iconSvg.setAttribute('fill', 'currentColor');
                    iconSvg.setAttribute('viewBox', '0 0 20 20');
                    iconSvg.setAttribute('aria-hidden', 'true');
                    iconSvg.classList.add(
                      'flex-shrink-0',
                      'h-5',
                      'w-5',
                      'text-green-500'
                    );
                    iconPath.setAttribute(
                      'd',
                      'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    );
                    iconPath.setAttribute('clip-rule', 'evenodd');
                    iconSvg.appendChild(iconPath);
                    elem_li.appendChild(iconSvg);
                  }
                  {
                    let elem_span = document.createElement('span');
                    elem_span.className = 'text-sm text-gray-500';
                    elem_span.innerHTML = i.item;
                    elem_li.appendChild(elem_span);
                  }
                  elem_ul.appendChild(elem_li);
                }
              });
              div2.appendChild(elem_ul);
            }
            item.appendChild(div2);
          }
        }
        priceList.appendChild(item);
      });
    });
})();

(function initButtons() {
  function onClickPrice(btn) {
    const pricermth = document.querySelectorAll('.pricemth');
    const priceryly = document.querySelectorAll('.priceyly');

    if (btn === document.querySelector('#monthly-plans-btn')) {
      document.querySelector('#monthly-plans-btn').classList.add('bg-white');
      document.querySelector('#annual-plans-btn').classList.remove('bg-white');
      pricermth.forEach((p) => {
        p.classList.remove('hidden');
      });
      priceryly.forEach((p) => {
        p.classList.add('hidden');
      });
    } else {
      document.querySelector('#monthly-plans-btn').classList.remove('bg-white');
      document.querySelector('#annual-plans-btn').classList.add('bg-white');
      pricermth.forEach((p) => {
        p.classList.add('hidden');
      });
      priceryly.forEach((p) => {
        p.classList.remove('hidden');
      });
    }
  }
  const btnm = document.querySelector('#monthly-plans-btn');
  btnm.classList.remove('bg-white');
  btnm.addEventListener('click', function (event) {
    onClickPrice(event.target);
  });

  const btny = document.querySelector('#annual-plans-btn');
  btny.classList.remove('bg-white');
  btny.addEventListener('click', function (event) {
    onClickPrice(event.target);
  });
  onClickPrice(btnm);
})();
