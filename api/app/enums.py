import enum

class CurrencyEnum(enum.Enum):
    USD = '1'
    EUR = '2'
    MKD = '3'
    RON = '4'
    BGN = '5'
    HRK = '6'
    CZK = '7'
    HUF = '8'
    PLN = '9'
    SEK = '10'
    DKK = '11'

    @staticmethod
    def get_symbol(currency):
        symbols = {
            'USD': '$', 'EUR': '€', 'MKD': 'ден', 'RON': 'lei',
            'BGN': 'лв', 'HRK': 'kn', 'CZK': 'Kč', 'HUF': 'Ft',
            'PLN': 'zł', 'SEK': 'kr', 'DKK': 'kr'
        }
        return symbols.get(currency.name, currency.name)

    @staticmethod
    def get_all_symbols():
        return [[currency, CurrencyEnum.get_symbol(currency)] for currency in CurrencyEnum]

# Example usage
currency_symbols = CurrencyEnum.get_all_symbols()
