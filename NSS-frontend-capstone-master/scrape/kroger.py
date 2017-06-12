import requests
from bs4 import BeautifulSoup

# required for the request.get()
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}
# target URL
url = "http://grocerysmarts.com/tenn/lists/indexmemphis.php?a37ll2"
# will need to increase the page number with a for loop

# https://www.kroger.com/weeklyad?StoreCode=00511&DivisionId=026


# get the request object containing all info to get ready for the soup
response = requests.get(url, timeout=10)
# print(request)
# catching a bad download
# try:
#     requests.raise_for_status()
# except Exception as exc:
#     print('There was a problem: %s' % (exc))

soup = BeautifulSoup(response.content, "html.parser")

table_cells = soup.find_all(attrs = {'width': ['228', '55']})
# print(table_cells)

for cell in table_cells:
    for i in cell:
        table_data = str(i).replace('<td valign="top" width="228"><b>', '').replace('<td valign="top" width="228">', '').replace('</td>', '').replace('<br/>', '').replace('<b>', '').replace('</b>', '')
        print(table_data)

# grabs the html from the object and writes to a txt file that will be passed into beautiful soup
# with open('kroger.txt', 'wb') as data:

#     for chunk in soup.select('.item'):
#         print(chunk)

# print(data)




