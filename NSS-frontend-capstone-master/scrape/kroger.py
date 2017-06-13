import requests
from bs4 import BeautifulSoup

# required for the request.get()
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}
# target URL
url = "http://grocerysmarts.com/tenn/lists/indexmemphis.php?a37ll2"

# get the request object containing all info to get ready for the soup
response = requests.get(url, timeout=10)

soup = BeautifulSoup(response.content, "html.parser")

# target the specific cells that hold the product name, and product price.  widths below correspond respectively
table_cells = soup.find_all(attrs = {'width': ['228', '55']})

# looping over all the cells in the table to wittle down the data to just kroger deals
for cell in table_cells:
    # this series of replace methods takes out all the lines that are not products and those products' prices
    kroger_data = cell.get_text().rstrip("Got a list question? Want to check if next week's list is ready?  Our listmakers answer questions and post our \"preview\" lists at PYP.").replace('Kroger', '').replace('Todays date:  How to use this list ', '').replace('Current list-This list is valid during the dates listed b', '').replace('This weeks FREE Friday Download is Pure Leaf Tea House Collection Tea 14 oz', '').replace('Buy 5 of the following products and save $5.00', '')
    # this if statement stops the loop from including the CVS section
    if 'CVS' in kroger_data:
        break
    else:
        # trying to iterate over the narrowed data to grab the names and prices
        for each in kroger_data:
            # currently this is printing out each character of the kroger_data, which is one giant string.  Maybe I need to make it a list again?
            print(each)





