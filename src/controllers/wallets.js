exports.getAllWallets = (req, res, next) => {
    res.json(
        {
            message: 'get all wallets',
            data: {
                id: 1,
                walletName: 'belanja',
                balance: 100000
            }
        }
    );

    next();
}

exports.createWallet = (req, res, next) => {
    res.json(
        {
            message: 'create wallets',
            data: {
                id: 1,
                walletName: 'belanja',
                balance: 100000
            }
        }
    );
    next();
}