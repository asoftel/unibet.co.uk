var testUrl = 'https://rsa.unibet.co.uk/api/graphql/config/gb';

describe('Task 3: Cypress API test', () => {
    it('Verify API: ' + testUrl, () => {

      cy.request({
        method: 'GET',
        url: testUrl,
        followRedirect: false,
        headers: {
          'accept': 'application/json',
          'charset': 'utf-8'
        } 
      })
      .then((response) => {
        
        let body = JSON.stringify(response.body);
        let parsedBody = JSON.parse(body);
        
        // Verify that Response is not Null (base check)
        expect(parsedBody).to.not.be.null;
        // End

        cy.log(parsedBody);

        // Verify that Response is 200
        expect(response.status).to.eq(200);
        // End
        
        // Verify that Response contains those keys: 'blockedJurisdictionPerCountry', 'sortCountriesByList', 'splashPage', 'enableDesktop'
        expect(parsedBody.blockedJurisdictionPerCountry).exist;
        expect(parsedBody.config.settings.lobby.sortCountriesByList).exist;
        expect(parsedBody.splashPage).exist;
        expect(parsedBody.uiConfiguration.RacingBanner['enableDesktop']).exist; // I detected 2 places with the same parameter so we check both of them: Place 1
        expect(parsedBody.uiConfiguration.MarketingWidget['enableDesktop']).exist; // I detected 2 places with the same parameter so we check both of them: Place 2
        // End
       
        // Verify that Response contains key 'twitterUser' & it equals to 'UnibetRacing'
        expect(parsedBody.config.settings.app['twitterUser']).to.eq('UnibetRacing');
        // End
        
        // Verify that Response contains key 'carouselLimit' & it is greater than 3
        expect(parsedBody.config.settings.carousel['carouselLimit']).to.gt(3);
        // End
        
        // Verify that Response contains key 'SplashPage background' & it is an url and and it is a jpg file
        var regExpJpgImage = new RegExp(`(https?:\/\/.*\.(?:jpg))`);
        expect(parsedBody.config.settings.splashPage['background']).match(regExpJpgImage);
        // End
        
        // Verify that Response contains key 'showTimeToJumpOnMobile' & it is not empty
        expect(parsedBody.config.settings.lobby['showTimeToJumpOnMobile']).is.not.NaN;
        // End
      })
    })
})