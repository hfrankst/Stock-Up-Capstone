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

table_cells = soup.find_all(attrs = {'width': ['228', '55']})

for cell in table_cells:
    kroger_data = cell.get_text()
    if 'CVS' in kroger_data:
            break
    else: 
        print(kroger_data)











        # I need a way to look for this bit of code '<p align="left">' and stop once that is seen
        # I need to figure out a way to stop the loop once it reaches the 'cvs' section.  Look at a while loop to accomplish this. Focus on only getting the kroger info, and then later get info from cvs, wallgreens and any others that are available. Also, learn how to incorporate the scraped data into the django framework. 
        # need to figure out how to stop the loop 