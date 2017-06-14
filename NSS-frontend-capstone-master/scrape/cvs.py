import requests
from bs4 import BeautifulSoup

# required for the request.get()
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}
# target URL
url = "http://www.grocerysmarts.com/tenn/lists/indexmemphis.php?c37vs2"

# get the request object containing all info to get ready for the soup
response = requests.get(url, timeout=10)

soup = BeautifulSoup(response.content, "html.parser")
