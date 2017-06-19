import requests
from bs4 import BeautifulSoup
import pandas as pd
import pandas.io.sql as pd_sql
from pprint import pprint
import sqlite3 as sql

# Scraping by store
def scrape_store(url):
    """
    Purpose: to scrape the target url and parse the information with the intent of inserting to the database
    Author: Harper Frankstone/ Gilbert Diaz
    Args: url -- (string) url address to point the requests.get() method to
    """
    
    # Hits the store url and creats BeaustifulSoup Object
    response = requests.get(url)
    html = BeautifulSoup(response.content, 'html.parser')
    
    # Empty list to build store sales
    super_market = list()

    # Create item, price, store objects
    items = html.find_all(attrs={'width': "228"})
    prices = html.find_all(attrs={'width': "55"})
    
    # Gets the store's name
    for k, store in enumerate(items):
        if k == 1:
            store_name = store.text 

    # Append items to list
    for k, item in enumerate(items):
        if k > 3:
            super_market.append([item.text])
    
    # Append price to list
    for k, price in enumerate(prices):
        if k > 3:
            super_market[k-4].append(price.text)

    # Append store's name to list            
    for k, _ in enumerate(super_market):
        super_market[k].append(store_name)

    return super_market

def write_to_sqlite(list_obj):
    """
    Purpose: to take the list_obj and write it to the Product table of the database
    Author: Harper Frankstone/Gilbert Diaz
    Args: list_obj -- a list of strings 
    """
    
    # pass
    colomn_name = ['name', 'sale_price', 'store']
    df = pd.DataFrame(list_obj, columns=colomn_name)
    con = sql.connect("../../django/capstone/db.sqlite3")
    try:
        pd_sql.to_sql(df, "stock_up_product", con, index=False)
    except ValueError:
        pd_sql.to_sql(df, 'stock_up_product', con, index=False, if_exists='append')



# the urls for scraping
kroger_url = "http://www.grocerysmarts.com/tenn/lists/indexmemphis.php?k37ro2"
cvs_url = "http://www.grocerysmarts.com/tenn/lists/indexmemphis.php?c37vs2"
target_url = "http://www.grocerysmarts.com/tenn/lists/indexmemphis.php?t37ar2"

kroger_list = scrape_store(kroger_url)
write_to_sqlite(kroger_list)

cvs_list = scrape_store(cvs_url)
write_to_sqlite(cvs_list)

target_list = scrape_store(target_url)
write_to_sqlite(target_list)
