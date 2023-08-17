let productsList = document.querySelector('.productsList');

productsList.addEventListener('click', async (ev) => {
    // console.log(ev);
    if (ev.target.classList.contains('addToCart')) {
        ev.preventDefault();
        let productId = ev.target.getAttribute('productId');

        console.log(productId);
        try {
            let data = await axios.post('/shop/addToCart',
                { productId })
                .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            console.log(data);

            await axios.get('/shop/addToCart')
            .then(function (result){
                console.log(result);
            })
            .catch(err=> console.log(err))
        } catch (err) {
            console.log(err)
        }
    }

})


