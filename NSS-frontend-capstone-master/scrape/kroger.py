import sqlite3
import requests
from bs4 import BeautifulSoup


def write_to_product_table(name, sale_price):
    """
    Purpose: to write the sale_price and name to the database
    Author: Harper Frankstone
    Args: name -- text of product names, sale_price -- text of the product price
    """


    with sqlite3.connect('../../django/capstone/db.sqlite3') as conn:
        c = conn.cursor()

        c.execute("INSERT INTO stock_up_krogerproduct VALUES (?, ?, ?, ?)", (None, name, 1, sale_price))

        conn.commit()


# required for the request.get()
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}
# target URL
url = "http://www.grocerysmarts.com/tenn/lists/indexmemphis.php?k37ro2"

# get the request object containing all info to get ready for the soup
response = requests.get(url, timeout=10)

soup = BeautifulSoup(response.content, "html.parser")
tables = soup.find_all('td')
raw_table_data = tables[35:-3]

# the following empty lists, and code block iterate over the raw_table_data to separate the prices and names into corresponding lists
names = []
prices = []
for table_cell in raw_table_data:
    if table_cell['width'] == '228':
        product_name = table_cell.get_text()
        names.append(product_name.replace('Got a list question? Want to check if next week\'s list is ready?  Our listmakers answer questions and post our "preview" lists at PYP.', ''))
    elif table_cell['width'] == '55':
        product_price = table_cell.get_text()
        prices.append(product_price.replace(u'\xa0', u' '))
    name_string = '%'.join(names)
    price_string = '%'.join(prices)
            
# print('names: ', names)
# print('prices: ', prices)

    # passing the lists to the function that will write to a database
    write_to_product_table(name_string, price_string)






























# looping over all the cells in the table to wittle down the data to name and price for the deals
# for row in soup.find_all('tr'):
#     cell_info = row.find_all('td')
#     print(cell_info[1])



    # for each in cell_info:
    #     if each['width'] == '228':
    #         name = each.get_text().replace('Todays date:  How to use this list ', '').replace('Current list-This list is valid during the dates listed below', '').replace('This weeks FREE Friday Download is Ocean Spray Mocktails Juice 33.8 oz', '').replace('Kroger Coupon Policy', '')
    #     elif each['width'] == '55':
    #         sale_price = each.get_text()
    #         print(sale_price)
        



