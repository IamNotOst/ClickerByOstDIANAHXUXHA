bot.command('top', (ctx) => {
    // Получаем данные из localStorage (в реальности нужно передавать их с клиента)
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};
    
    // Топ по очкам
    const scoreTop = Object.values(leaderboard)
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
    
    // Топ по силе клика
    const clickPowerTop = Object.values(leaderboard)
        .sort((a, b) => b.clickPower - a.clickPower)
        .slice(0, 20);
    
    // Формируем сообщения
    let scoreMessage = '<b>Рейтинг игроков по балансу:</b>\n';
    scoreTop.forEach((player, index) => {
        scoreMessage += `${index + 1}. <a href="tg://user?id=${player.userId}">${player.name}</a> - ${player.score.toLocaleString()}\n`;
    });
    
    let clickPowerMessage = '<b>Рейтинг игроков по силе клика:</b>\n';
    clickPowerTop.forEach((player, index) => {
        clickPowerMessage += `${index + 1}. <a href="tg://user?id=${player.userId}">${player.name}</a> - ${player.clickPower.toLocaleString()}\n`;
    });
    
    // Отправляем сообщения
    ctx.replyWithHTML(scoreMessage);
    ctx.replyWithHTML(clickPowerMessage);
});