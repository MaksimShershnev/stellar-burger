describe('Блок E2E тестов>', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1280, 800);
    cy.visit('http://localhost:4000');
  });

  describe('Добавление ингредиента из списка ингредиентов в конструктор', function () {
    it('Добавление булки в конструктор', function () {
      cy.get('[data-cy=buns]').contains('Добавить').click();
      cy.get('[data-cy=constructor-bun-top]')
        .contains('Булка 1')
        .should('exist');
      cy.get('[data-cy=constructor-bun-bottom]')
        .contains('Булка 1')
        .should('exist');
    });

    it('Добавление начинки в конструктор', function () {
      cy.get('[data-cy=mains]').contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Ингредиент 1')
        .should('exist');
    });

    it('Добавление соуса в конструктор', function () {
      cy.get('[data-cy=sauces]').contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Соус 1')
        .should('exist');
    });
  });

  describe('Работа модального окна', function () {
    it('Тест открытия модального окна с деталями ингредиента', function () {
      cy.get('[data-cy=modal-content]').should('not.exist');
      cy.get('[data-cy=ingredients]').contains('Булка 1').click();
      cy.get('[data-cy=modal-content]').contains('Булка 1').should('exist');
    });

    it('Тест закрытия модального окна по клику на кнопку Х', function () {
      cy.get('[data-cy=ingredients]').contains('Булка 1').click();
      cy.get('[data-cy=modal-content]').contains('Булка 1').should('exist');
      cy.get('[data-cy=modal-content] button[type=button]').click();
      cy.get('[data-cy=modal-content]').should('not.exist');
    });

    it('Тест закрытия модального окна по клику на оверлей', function () {
      cy.get('[data-cy=ingredients]').contains('Булка 1').click();
      cy.get('[data-cy=modal-content]').contains('Булка 1').should('exist');
      cy.get('[data-cy=modal-overlay]').click('top', { force: true });
      cy.get('[data-cy=modal-content]').should('not.exist');
    });
  });

  describe('Создание и отправка заказа', function () {
    beforeEach(function () {
      cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'userOrder.json' }).as(
        'postOrder'
      );

      window.localStorage.setItem('refreshToken', JSON.stringify('123456789'));
      cy.setCookie('accessToken', JSON.stringify('987654321'));
      cy.visit('http://localhost:4000');
    });

    afterEach(function () {
      cy.clearCookie('refreshToken');
      cy.clearCookie('accessToken');
    });

    it('Тест добавления ингредиентов и отправки заказа', function () {
      // добавляем ингредиенты, оформляем заказ
      cy.get('[data-cy=buns]').contains('Добавить').click();
      cy.get('[data-cy=mains]').contains('Добавить').click();
      cy.get('[data-cy=sauces]').contains('Добавить').click();
      cy.get('[data-cy=order-total] button').click();

      // проверка состава добавленных игредиентов в принятом заказе
      cy.wait('@postOrder')
        .its('request.body')
        .should('deep.equal', {
          ingredients: ['1', '2', '4', '1']
        });

      // проверяем номер заказа
      cy.get('[data-cy=modal-content]').contains('12345').should('exist');

      // закрываем модальное окно и проверяем что модалки нет
      cy.get('[data-cy=modal-content] button[type=button]').click();
      cy.get('[data-cy=modal-content]').should('not.exist');
      // проверяем, что конструктор очищен от булок и начинки
      cy.get('[data-cy=constructor]').contains('Булка 1').should('not.exist');
      cy.get('[data-cy=constructor]')
        .contains('Ингредиент 1')
        .should('not.exist');
      cy.get('[data-cy=constructor]').contains('Соус 1').should('not.exist');
    });
  });
});
